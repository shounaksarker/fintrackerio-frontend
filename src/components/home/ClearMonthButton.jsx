'use client';

import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { DataContext } from '@/context/DataContext';
import { notification } from '@/components/notification';
import { SEED_URL } from '@/helpers/frontend/apiEndpoints';
import ConfirmModal from '@/components/modals/ConfirmModal';

const ClearMonthButton = () => {
  const isStage = process.env.NEXT_PUBLIC_NODE_ENV === 'stage';
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
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (!isStage || balanceLoading) {
      setVisible(false);
      return;
    }
    const hasData = balance.total_income > 0 || balance.total_expense > 0;
    setVisible(hasData);
  }, [balance, balanceLoading, isStage]);

  if (!visible) return null;

  const handleClear = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(SEED_URL);
      if (res.data.success) {
        notification('🗑️ Month data cleared.', { type: 'success', id: 'clearSuccess' });
        setConfirmOpen(false);
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
        notification(res.data.msg || 'Failed to clear data', { type: 'error', id: 'clearError' });
      }
    } catch (err) {
      notification(err.message || 'Something went wrong', { type: 'error', id: 'clearError' });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="text-xs text-gray-400 underline decoration-dashed underline-offset-2 transition hover:text-pRed"
        >
          🗑️ Clear this month&apos;s data
        </button>
      </div>

      <ConfirmModal
        modalOpen={confirmOpen}
        setModalOpen={setConfirmOpen}
        title="Are you sure you want to clear all data for this month?"
        loading={loading}
        handleSubmit={handleClear}
      />
    </>
  );
};

export default ClearMonthButton;
