'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { notification } from '@/components/notification';
import { SENTRY_ERRORS_URL, SENTRY_STATS_URL } from '@/helpers/frontend/apiEndpoints';
import { getDateTime } from '@/helpers/frontend/formateDate';
import Shimmer from '@/components/fields/Shimmer';
import { Badge, StatCard, FilterSelect } from '@/components/sentry/SentryUIComponents';
import ConfirmModal from '@/components/modals/ConfirmModal';
import {
  SENTRY_LEVEL_CONFIG,
  SENTRY_SOURCE_CONFIG,
  SENTRY_SOURCE_OPTIONS,
  SENTRY_LEVEL_OPTIONS,
  SENTRY_STATUS_OPTIONS,
} from '@/assets/constants';

// ─── Main Page ───────────────────────────────────────────────────
const SentryPage = () => {
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Filters
  const [source, setSource] = useState('');
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimer = useRef(null);
  const detailCache = useRef(new Map());

  // Delete confirmation
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Bulk Actions
  const [selectedErrors, setSelectedErrors] = useState(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkDeleteModalOpen, setBulkDeleteModalOpen] = useState(false);

  // ── Fetch stats ─────────────────────────────────────────────
  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await axios.get(SENTRY_STATS_URL);
      if (res.data?.success) setStats(res.data.data);
    } catch {
      /* swallow – stats are non-critical */
    }
    setStatsLoading(false);
  }, []);

  // ── Fetch error list ────────────────────────────────────────
  const fetchErrors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(SENTRY_ERRORS_URL, {
        params: { page, limit: 20, source, level, status, search },
      });
      if (res.data?.success) {
        setErrors(res.data.data.results || []);
        setTotalPages(res.data.data.totalPages || 1);
      } else {
        notification(res.data?.msg || 'Failed to fetch errors.', { type: 'error', id: 'sentryList' });
      }
    } catch {
      notification('Failed to fetch errors.', { type: 'error', id: 'sentryList' });
    }
    setLoading(false);
  }, [page, source, level, status, debouncedSearch]);

  // ── Debounce search ────────────────────────────────────────
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 700);
    return () => clearTimeout(searchTimer.current);
  }, [search]);

  // ── Fetch single error detail ───────────────────────────────
  const fetchDetail = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);

    // return cached detail if already fetched
    if (detailCache.current.has(id)) {
      setDetail(detailCache.current.get(id));
      return;
    }

    setDetailLoading(true);
    try {
      const res = await axios.get(`${SENTRY_ERRORS_URL}/${id}`);
      if (res.data?.success) {
        detailCache.current.set(id, res.data.data);
        setDetail(res.data.data);
      }
    } catch {
      notification('Failed to load error detail.', { type: 'error', id: 'sentryDetail' });
    }
    setDetailLoading(false);
  };

  // ── Toggle resolved ─────────────────────────────────────────
  const toggleResolved = async (id) => {
    try {
      const res = await axios.patch(`${SENTRY_ERRORS_URL}/${id}`);
      if (res.data?.success) {
        notification('Status updated.', { type: 'success', id: 'sentryResolve' });

        // optimistic update — toggle locally without refetching
        const newResolved = !detail?.is_resolved;
        setErrors((prev) => prev.map((e) => (e.id === id ? { ...e, is_resolved: newResolved } : e)));
        setDetail((prev) => (prev?.id === id ? { ...prev, is_resolved: newResolved } : prev));
        detailCache.current.delete(id);

        // update stats locally
        setStats((prev) => {
          if (!prev) return prev;
          const delta = newResolved ? -1 : 1;
          return { ...prev, open_count: Number(prev.open_count || 0) + delta };
        });
      }
    } catch {
      notification('Failed to update.', { type: 'error', id: 'sentryResolve' });
    }
  };

  // ── Delete resolved error ──────────────────────────────────
  const deleteError = async () => {
    if (!deleteConfirmId) return;
    setDeleteLoading(true);
    try {
      const res = await axios.delete(`${SENTRY_ERRORS_URL}/${deleteConfirmId}`);
      if (res.data?.success) {
        notification('Error log deleted.', { type: 'success', id: 'sentryDelete' });

        // optimistic removal from list
        setErrors((prev) => prev.filter((e) => e.id !== deleteConfirmId));
        detailCache.current.delete(deleteConfirmId);
        if (expandedId === deleteConfirmId) {
          setExpandedId(null);
          setDetail(null);
        }

        // update stats locally
        setStats((prev) => {
          if (!prev) return prev;
          return { ...prev, total: Number(prev.total || 1) - 1 };
        });
      } else {
        notification(res.data?.msg || 'Failed to delete.', { type: 'error', id: 'sentryDelete' });
      }
    } catch {
      notification('Failed to delete.', { type: 'error', id: 'sentryDelete' });
    }
    setDeleteLoading(false);
    setDeleteConfirmId(null);
  };

  // ── Bulk Resolve ───────────────────────────────────────────
  const handleBulkResolve = async () => {
    if (selectedErrors.size === 0) return;
    setBulkLoading(true);
    let successCount = 0;

    // Execute multiple PATCH requests in parallel
    const promises = Array.from(selectedErrors).map((id) =>
      axios
        .patch(`${SENTRY_ERRORS_URL}/${id}`)
        .then((res) => {
          if (res.data?.success) successCount += 1;
        })
        .catch(() => {})
    );

    await Promise.allSettled(promises);

    if (successCount > 0) {
      notification(`Resolved ${successCount} errors.`, { type: 'success', id: 'sentryBulkResolve' });
      setSelectedErrors(new Set()); // Clear selection
      fetchErrors(); // Refetch the list
      fetchStats(); // Refetch stats
    } else {
      notification('Failed to resolve selected errors.', { type: 'error', id: 'sentryBulkResolve' });
    }
    setBulkLoading(false);
  };

  // ── Bulk Delete ────────────────────────────────────────────
  const handleBulkDelete = async () => {
    if (selectedErrors.size === 0) return;
    setBulkLoading(true);
    let successCount = 0;

    const promises = Array.from(selectedErrors).map((id) =>
      axios
        .delete(`${SENTRY_ERRORS_URL}/${id}`)
        .then((res) => {
          if (res.data?.success) successCount += 1;
        })
        .catch(() => {})
    );

    await Promise.allSettled(promises);

    if (successCount > 0) {
      notification(`Deleted ${successCount} errors.`, { type: 'success', id: 'sentryBulkDelete' });
      setSelectedErrors(new Set());
      setExpandedId(null);
      setDetail(null);
      fetchErrors();
      fetchStats();
    } else {
      notification('Failed to delete selected errors.', { type: 'error', id: 'sentryBulkDelete' });
    }
    setBulkLoading(false);
    setBulkDeleteModalOpen(false);
  };

  // ── Handlers for Selection ─────────────────────────────────
  const toggleSelection = (id) => {
    const newSet = new Set(selectedErrors);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedErrors(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedErrors.size === errors.length && errors.length > 0) {
      // Deselect all
      setSelectedErrors(new Set());
    } else {
      // Select all visible on current page
      setSelectedErrors(new Set(errors.map((e) => e.id)));
    }
  };

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchErrors();
  }, [fetchErrors]);

  // When filters change, reset to page 1
  useEffect(() => {
    setPage(1);
  }, [source, level, status, debouncedSearch]);

  // Clear selection when page or source data changes
  useEffect(() => {
    setSelectedErrors(new Set());
  }, [page, source, level, status, debouncedSearch, errors.length]);

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="min-h-[85vh] md:min-h-[83vh]">
      {/* Title */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-2xl">🛡️</span>
        <h1 className="text-2xl font-bold text-gray-900">Error Tracking</h1>
      </div>

      {/* ── Stats Bar ──────────────────────────────────────────── */}
      {statsLoading ? (
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Shimmer key={i} className="h-[80px] rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Total Errors" value={stats?.total} />
          <StatCard label="Open" value={stats?.open_count} color="text-orange-600" />
          <StatCard label="Critical" value={stats?.critical_count} color="text-red-600" />
          <StatCard label="Today" value={stats?.today_count} color="text-pest" />
        </div>
      )}

      {/* ── Filters ────────────────────────────────────────────── */}
      <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <FilterSelect label="Source" value={source} onChange={setSource} options={SENTRY_SOURCE_OPTIONS} />
        <FilterSelect label="Level" value={level} onChange={setLevel} options={SENTRY_LEVEL_OPTIONS} />
        <FilterSelect label="Status" value={status} onChange={setStatus} options={SENTRY_STATUS_OPTIONS} />

        <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-gray-500">
          Search
          <input
            type="text"
            placeholder="Search message or URL…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-pest focus:outline-none focus:ring-1 focus:ring-pest"
          />
        </label>

        <button
          onClick={() => {
            setSource('');
            setLevel('');
            setStatus('');
            setSearch('');
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          Reset
        </button>
      </div>

      {/* ── Error list / table ─────────────────────────────────── */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Shimmer key={i} className="h-[60px] rounded-lg" />
          ))}
        </div>
      )}

      {!loading && errors.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-400">
          <span className="text-5xl">🎉</span>
          <p className="text-sm font-medium">No errors found</p>
        </div>
      )}

      {/* ── Bulk Action Bar ────────────────────────────────────── */}
      {!loading && errors.length > 0 && (
        <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 shadow-sm">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="size-4 cursor-pointer rounded border-gray-300 text-pest focus:ring-pest"
              checked={selectedErrors.size === errors.length && errors.length > 0}
              ref={(input) => {
                if (input) {
                  input.indeterminate = selectedErrors.size > 0 && selectedErrors.size < errors.length;
                }
              }}
              onChange={toggleSelectAll}
            />
            <span className="text-sm font-medium text-gray-700">
              {selectedErrors.size > 0
                ? `${selectedErrors.size} item${selectedErrors.size > 1 ? 's' : ''} selected`
                : 'Select All (This Page)'}
            </span>
          </div>

          {selectedErrors.size > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkResolve}
                disabled={bulkLoading}
                className="flex items-center gap-1 rounded bg-pest px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-pest-200 disabled:opacity-50"
              >
                {bulkLoading ? 'Processing...' : '✓ Resolve Selected'}
              </button>
              <button
                onClick={() => setBulkDeleteModalOpen(true)}
                disabled={bulkLoading}
                className="flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                🗑 Delete Selected
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && errors.length !== 0 && (
        <div className="flex flex-col gap-2">
          {errors.map((err) => (
            <div
              key={err.id}
              className={`overflow-hidden rounded-lg border transition-colors ${
                selectedErrors.has(err.id)
                  ? 'border-pest bg-blue-50/30'
                  : 'border-gray-200 bg-white shadow-sm'
              }`}
            >
              {/* Row summary */}
              <div className="flex w-full items-center px-4 py-3 transition-colors hover:bg-gray-50">
                {/* Checkbox wrapper */}
                <div className="flex items-center justify-center pr-3">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer rounded border-gray-300 text-pest focus:ring-pest"
                    checked={selectedErrors.has(err.id)}
                    onChange={() => toggleSelection(err.id)}
                  />
                </div>

                {/* Clickable Expander Region */}
                <button
                  onClick={() => fetchDetail(err.id)}
                  className="flex size-full flex-1 items-center gap-3 text-left"
                >
                  <span
                    className={`size-2.5 shrink-0 rounded-full ${SENTRY_LEVEL_CONFIG[err.level]?.dot || 'bg-gray-400'}`}
                  />
                  <span className="flex-1 truncate text-sm font-medium text-gray-800">
                    {err.message || 'No message'}
                  </span>
                  <Badge
                    config={
                      SENTRY_SOURCE_CONFIG[err.source] || {
                        label: err.source,
                        bg: 'bg-gray-100 text-gray-600',
                      }
                    }
                  />
                  <Badge
                    config={
                      SENTRY_LEVEL_CONFIG[err.level] || { label: err.level, bg: 'bg-gray-100 text-gray-600' }
                    }
                  />
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      err.is_resolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {err.is_resolved ? 'Resolved' : 'Open'}
                  </span>
                  {err.method && (
                    <span className="hidden font-mono text-xs text-gray-400 md:inline">
                      {err.method} {err.status_code || ''}
                    </span>
                  )}
                  <span className="hidden shrink-0 text-xs text-gray-400 lg:inline">
                    {getDateTime(err.created_at)}
                  </span>
                  <svg
                    className={`size-4 shrink-0 text-gray-400 transition-transform ${expandedId === err.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Expanded detail */}
              {expandedId === err.id && (
                <div className="border-t border-gray-100 bg-gray-50 p-4">
                  {detailLoading && <Shimmer className="h-[120px] rounded-lg" />}
                  {!detailLoading && detail && (
                    <div className="flex flex-col gap-4 text-sm">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
                        <span>
                          <b>ID:</b> {detail.id}
                        </span>
                        <span>
                          <b>Source:</b> {detail.source}
                        </span>
                        <span>
                          <b>Level:</b> {detail.level}
                        </span>
                        <span>
                          <b>Method:</b> {detail.method || '—'}
                        </span>
                        <span>
                          <b>Status Code:</b> {detail.status_code || '—'}
                        </span>
                        <span>
                          <b>URL:</b> {detail.url || '—'}
                        </span>
                        <span>
                          <b>IP:</b> {detail.ip || '—'}
                        </span>
                        <span>
                          <b>Date:</b> {getDateTime(detail.created_at)}
                        </span>
                      </div>

                      {/* User info */}
                      {(detail.username || detail.email) && (
                        <div className="flex items-center gap-4 rounded-lg bg-white p-3 text-gray-700">
                          <span className="text-lg">👤</span>
                          <div>
                            <p className="font-medium">{detail.username || '—'}</p>
                            <p className="text-xs text-gray-400">{detail.email || '—'}</p>
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Message
                        </h4>
                        <p className="whitespace-pre-wrap rounded-lg bg-white p-3 font-mono text-xs text-gray-800">
                          {detail.message || '—'}
                        </p>
                      </div>

                      {detail.stack && (
                        <div>
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Stack Trace
                          </h4>
                          <pre className="max-h-60 overflow-auto rounded-lg bg-gray-900 p-3 font-mono text-xs text-green-400">
                            {detail.stack}
                          </pre>
                        </div>
                      )}

                      {detail.payload && (
                        <div>
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Payload
                          </h4>
                          <pre className="max-h-40 overflow-auto rounded-lg bg-gray-900 p-3 font-mono text-xs text-amber-300">
                            {typeof detail.payload === 'string'
                              ? detail.payload
                              : JSON.stringify(detail.payload, null, 2)}
                          </pre>
                        </div>
                      )}

                      {detail.user_agent && (
                        <p className="text-xs text-gray-400">
                          <b>User Agent:</b> {detail.user_agent}
                        </p>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => toggleResolved(detail.id)}
                          className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                            detail.is_resolved
                              ? 'bg-orange-500 hover:bg-orange-600'
                              : 'bg-pest hover:bg-pest-200'
                          }`}
                        >
                          {detail.is_resolved ? '↩ Re-open' : '✓ Mark Resolved'}
                        </button>
                        {detail.is_resolved ? (
                          <button
                            onClick={() => setDeleteConfirmId(detail.id)}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                          >
                            🗑 Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ─────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-40"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pgNo) => (
            <button
              key={pgNo}
              onClick={() => setPage(pgNo)}
              className={`rounded-full border px-2.5 py-1 text-sm transition-colors ${
                pgNo === page
                  ? 'border-pest bg-pest text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {pgNo}
            </button>
          ))}
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}

      {/* ── Delete Confirm Modal ─────────────────────────────── */}
      <ConfirmModal
        modalOpen={!!deleteConfirmId}
        setModalOpen={(v) => {
          if (!v) setDeleteConfirmId(null);
        }}
        title="Permanently delete this error log? This cannot be undone."
        loading={deleteLoading}
        handleSubmit={deleteError}
        afterClose={() => setDeleteConfirmId(null)}
      />

      {/* ── Bulk Delete Confirm Modal ────────────────────────── */}
      <ConfirmModal
        modalOpen={bulkDeleteModalOpen}
        setModalOpen={setBulkDeleteModalOpen}
        title={`Permanently delete ${selectedErrors.size} error logs? This cannot be undone.`}
        loading={bulkLoading}
        handleSubmit={handleBulkDelete}
      />
    </div>
  );
};

export default SentryPage;
