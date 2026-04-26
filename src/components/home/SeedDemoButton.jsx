'use client';

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { DataContext } from '@/context/DataContext';
import { notification } from '@/components/notification';
import { SEED_URL } from '@/helpers/frontend/apiEndpoints';
import { ENVIRONMENT } from '@/assets/constants';

const SeedDemoButton = () => {
  const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === ENVIRONMENT.PRODUCTION;
  const {
    balance,
    balanceLoading,
    setBalance,
    fetchBalance,
    setIncomeData,
    fetchIncomeRecord,
    setExpenseData,
    fetchExpenseRecord,
    setYearlySummery,
  } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isProduction || balanceLoading) {
      setVisible(false);
      return;
    }
    const hasData = balance.total_income > 0 || balance.total_expense > 0;
    setVisible(!hasData);
  }, [balance, balanceLoading, isProduction]);

  if (!visible) return null;

  const handleSeed = async () => {
    setLoading(true);
    try {
      const res = await axios.post(SEED_URL);
      if (res.data.success) {
        notification('🎉 Demo data loaded!', { type: 'success', id: 'seedSuccess' });
        // Reset cached state so components refetch fresh data
        setBalance({});
        setIncomeData([]);
        setExpenseData([]);
        setYearlySummery(null);
        // Trigger refetches
        fetchBalance();
        fetchIncomeRecord();
        fetchExpenseRecord();
      } else {
        notification(res.data.msg || 'Failed to seed data', { type: 'error', id: 'seedError' });
      }
    } catch (err) {
      notification(err.message || 'Something went wrong', { type: 'error', id: 'seedError' });
    }
    setLoading(false);
  };

  return (
    <div className="mb-2 overflow-hidden rounded-2xl border border-amber-300/70 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 p-5 shadow-soft">
      <div className="flex flex-col gap-y-4 md:flex md:flex-row md:justify-between md:gap-y-4">
        <div className="flex flex-col md:max-w-[55%]">
          <div className="flex gap-x-2">
            <div className="text-2xl">✨</div>
            <h3 className="text-lg font-bold text-gray-800">Your dashboard is empty!</h3>
          </div>
          <p className="text-sm text-gray-500">
            Want to see how FinTracker works? Load sample income &amp; expense data for this month.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSeed}
          disabled={loading}
          className="group relative inline-flex items-center justify-center gap-x-2 overflow-hidden rounded-xl bg-gradient-to-r from-pest to-finance-teal px-4 py-2 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 md:px-8 md:py-3 lg:text-base"
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          {loading ? (
            <>
              <svg className="size-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Loading demo data...</span>
            </>
          ) : (
            <>
              <span>Populate with Sample Data</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SeedDemoButton;
