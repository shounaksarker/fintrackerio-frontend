'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  GET_NOTIFICATIONS_URL,
  MARK_NOTIFICATION_READ_URL,
  MARK_ALL_NOTIFICATIONS_READ_URL,
  DELETE_NOTIFICATION_URL,
} from '@/helpers/frontend/apiEndpoints';
import RedCross from '@/assets/svg/Icon/RedCross';
import { NOTIFICATION_TYPE_CONFIG } from '@/assets/constants';

const NotificationItem = ({ notification, onMarkRead, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const config = NOTIFICATION_TYPE_CONFIG[notification.type] || NOTIFICATION_TYPE_CONFIG.info;
  const isRead = Number(notification.is_read) === 1;

  const handleClick = () => {
    if (!isRead) {
      onMarkRead(notification.id);
    }
    setExpanded(!expanded);
  };

  const handleNavigate = (e) => {
    e.stopPropagation();
    if (notification.link) {
      router.push(notification.link);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer border-b border-gray-300 px-4 py-3 transition-all duration-200 hover:bg-gray-100 ${
        isRead && !expanded ? 'opacity-70' : 'bg-white'
      }`}
    >
      <div className={`flex gap-3 ${expanded ? 'items-start' : 'items-center'}`}>
        <div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}>
          <span className="text-sm">{config.icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={`flex flex-col items-start md:flex-row md:items-center md:justify-between md:gap-2`}
          >
            <div
              className={`flex items-center gap-x-1 truncate text-sm md:text-[12px] ${isRead ? 'font-normal text-gray-500' : 'font-semibold'}`}
            >
              {!isRead && !expanded ? <div className="size-1.5 rounded-full bg-pest" /> : null}
              {notification.title}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <span className="shrink-0 whitespace-nowrap text-xs text-gray-500">
                {moment(notification.created_at).fromNow()}
              </span>
              <button
                onClick={handleDelete}
                className="ml-1 hidden rounded p-1 text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400 md:block"
                title="Delete"
              >
                <RedCross />
              </button>
            </div>
          </div>

          {expanded && notification.message && (
            <div className="p-3">
              <p className="text-xs leading-relaxed text-gray-500">{notification.message}</p>
              {notification.link && (
                <button
                  onClick={handleNavigate}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-pest transition-colors hover:text-pest/80"
                >
                  View →
                </button>
              )}
            </div>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="ml-1 rounded text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400 md:hidden"
          title="Delete"
        >
          <RedCross />
        </button>
      </div>
    </div>
  );
};

const NotificationPanel = ({ isOpen, onClose, onCountUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${GET_NOTIFICATIONS_URL}?page=${pageNum}&limit=20`);
      if (res.data?.success && res.data?.data) {
        setNotifications(res.data.data.notifications || []);
        setTotalPages(res.data.data.totalPages || 1);
        setPage(res.data.data.currentPage || 1);
      }
    } catch {
      // Axios interceptor handles sentry logging
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications(1);
    }
  }, [isOpen]);

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`${MARK_NOTIFICATION_READ_URL}/${id}/read`);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: 1 } : n)));
      onCountUpdate();
    } catch {
      // Axios interceptor handles sentry logging
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put(MARK_ALL_NOTIFICATIONS_READ_URL);
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: 1 })));
      onCountUpdate();
    } catch {
      // Axios interceptor handles sentry logging
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${DELETE_NOTIFICATION_URL}/${id}`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      onCountUpdate();
    } catch {
      // Axios interceptor handles sentry logging
    }
  };

  const unreadCount = notifications.filter((n) => Number(n.is_read) === 0).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute -right-[70px] top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-700/50 bg-white shadow-2xl shadow-black/40 sm:-right-[140px] sm:w-96 md:-right-4 ">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700/50 px-4 py-3">
          <h3 className="text-sm font-semibold text-black">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs font-medium text-pest transition-colors hover:text-pest/80"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="scrollbar-thin max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="size-6 animate-spin rounded-full border-2 border-gray-600 border-t-pest" />
            </div>
          ) : null}
          {!loading && notifications.length === 0 ? (
            <div className="py-8 text-center">
              <span className="text-2xl">🔔</span>
              <p className="mt-2 text-sm text-gray-600">No notifications yet</p>
            </div>
          ) : null}
          {!loading && notifications.length > 0
            ? notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkRead={handleMarkRead}
                  onDelete={handleDelete}
                />
              ))
            : null}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-700/50 px-4 py-2">
            <button
              onClick={() => fetchNotifications(page - 1)}
              disabled={page <= 1}
              className="text-xs text-gray-600 transition-colors hover:text-white disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="text-xs text-gray-700">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => fetchNotifications(page + 1)}
              disabled={page >= totalPages}
              className="text-xs text-gray-600 transition-colors hover:text-white disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;
