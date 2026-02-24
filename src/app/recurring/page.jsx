'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import CustomTable from '@/components/fields/Table';
import { formattedAmount } from '@/helpers/frontend/getSum';
import { EDIT_RECURRING_URL, DELETE_RECURRING_URL } from '@/helpers/frontend/apiEndpoints';
import { CURRENCY } from '@/assets/constants';
import { getDate } from '@/helpers/frontend/formateDate';
import { notification } from '@/components/notification';
import ConfirmModal from '@/components/modals/ConfirmModal';
import DeleteIcon from '@/assets/svg/Icon/DeleteIcon';
import { DataContext } from '@/context/DataContext';
import noDataImg from '@/assets/images/no-data.jpg';

const Page = () => {
  const { recurringData, setRecurringData, recurringLoading, fetchRecurringData, fetchForce } =
    useContext(DataContext);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if ((!recurringData.expense?.length && !recurringData.income?.length) || fetchForce) {
      fetchRecurringData();
    }
  }, [fetchForce]);

  const handleToggleActive = async (row) => {
    try {
      const res = await axios.put(`${EDIT_RECURRING_URL}/${row.id}`, {
        is_active: !row.is_active,
      });
      if (res.data.success) {
        notification(`Subscription ${row.is_active ? 'paused' : 'resumed'} successfully.`, {
          type: 'success',
        });
        setRecurringData((prev) => {
          if (row.type === 'expense') {
            return {
              ...prev,
              expense: prev.expense.map((item) =>
                item.id === row.id ? { ...item, is_active: !item.is_active } : item
              ),
            };
          }
          return {
            ...prev,
            income: prev.income.map((item) =>
              item.id === row.id ? { ...item, is_active: !item.is_active } : item
            ),
          };
        });
      } else {
        notification(res.data.msg || 'Failed to update status.', { type: 'error' });
      }
    } catch (error) {
      notification('Failed to update status.', { type: 'error' });
    }
  };

  const handleDelete = (row) => {
    setDeleteId(row.id);
    setDeleteConfirmModal(true);
  };

  const confirmDelete = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await axios.delete(`${DELETE_RECURRING_URL}/${deleteId}`);
      if (res.data.success) {
        notification(res.data.msg || 'Subscription deleted successfully.', { type: 'success' });
        setDeleteId(null);
        setDeleteConfirmModal(false);
        fetchRecurringData();
      } else {
        notification(res.data.msg || 'Failed to delete subscription.', { type: 'error' });
      }
    } catch (error) {
      notification('Failed to delete subscription.', { type: 'error' });
    }
    setActionLoading(false);
  };

  const actionCol = {
    label: 'Action',
    style: 'md:w-[90px] text-center',
    target: 'action',
    action: [
      {
        label: (row) => <div className="text-xl text-black">{row.is_active ? '⏸️' : '▶️'}</div>,
        onClick: (row) => handleToggleActive(row),
      },
      { label: <DeleteIcon className={`h-5 text-red-500`} />, onClick: (row) => handleDelete(row) },
    ],
  };

  const statusCol = {
    label: 'Status',
    style: 'md:w-[10%]',
    target: 'is_active',
    function: (val) => (
      <span
        className={`rounded-full px-2 py-1 text-xs ${val ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
      >
        {val ? 'Active' : 'Paused'}
      </span>
    ),
  };

  const expenseHeader = [
    { label: '#', style: 'md:w-[5%] text-center', index: true },
    {
      label: 'Category',
      style: 'md:w-[15%] capitalize',
      target: 'category_name',
    },
    {
      label: 'Spend On',
      style: 'md:w-[15%] capitalize truncate',
      target: 'spend_on',
    },
    {
      label: 'Terminal',
      style: 'md:w-[10%] capitalize',
      target: 'terminal_name',
    },
    {
      label: `Amount (${CURRENCY})`,
      style: 'md:w-[10%] font-semibold md:pl-3',
      target: 'amount',
      thStyle: '!pl-0',
      function: formattedAmount,
    },
    {
      label: 'Interval',
      style: 'md:w-[10%] capitalize',
      target: 'recurrence_interval',
    },
    {
      label: 'Next Execution',
      style: 'md:w-[15%]',
      target: 'next_execution_date',
      function: getDate,
    },
    statusCol,
    actionCol,
  ];

  const incomeHeader = [
    { label: '#', style: 'md:w-[5%] text-center', index: true },
    {
      label: 'Category',
      style: 'md:w-[20%] capitalize',
      target: 'category_name',
    },
    {
      label: 'Description',
      style: 'md:w-[20%] capitalize truncate',
      target: 'description',
    },
    {
      label: `Amount (${CURRENCY})`,
      style: 'md:w-[15%] font-semibold md:pl-3',
      target: 'amount',
      thStyle: '!pl-0',
      function: formattedAmount,
    },
    {
      label: 'Interval',
      style: 'md:w-[10%] capitalize',
      target: 'recurrence_interval',
    },
    {
      label: 'Next Execution',
      style: 'md:w-[15%]',
      target: 'next_execution_date',
      function: getDate,
    },
    statusCol,
    actionCol,
  ];

  return (
    <div className="mx-auto p-4">
      {!recurringLoading && !recurringData?.expense?.length && !recurringData?.income?.length && (
        <div className="flex flex-col items-center justify-center pt-10">
          <Image
            src={noDataImg}
            alt="No transactions"
            className="w-[200px] object-contain mix-blend-multiply"
          />
          <h3 className="mt-4 text-lg font-bold text-gray-600 md:text-2xl">
            No repeatative transactions found.
          </h3>
          <p className="mt-2 text-[15px] text-gray-400 md:text-center md:text-base">
            Automate your finances! Next time you add an income or expense,
            <br />
            just enable the &quot;Make it Repeatative&quot; option to see it appear here.
          </p>
        </div>
      )}

      {recurringData?.expense?.length > 0 && (
        <>
          <h3 className="my-6 text-center text-2xl font-bold text-pGray underline underline-offset-4">
            Repeatative Expenses
          </h3>
          <CustomTable
            headers={expenseHeader}
            data={recurringData?.expense || []}
            loading={recurringLoading}
            className={'mb-8 w-full'}
            tableClass={'rounded-md bg-white p-4 shadow-md'}
          />
        </>
      )}
      {recurringData?.income?.length > 0 && (
        <>
          <h3 className="mb-6 mt-10 text-center text-2xl font-bold text-pGray underline underline-offset-4">
            Repeatative Incomes
          </h3>
          <CustomTable
            headers={incomeHeader}
            data={recurringData?.income || []}
            loading={recurringLoading}
            className={'w-full'}
            tableClass={'rounded-md bg-white p-4 shadow-md'}
          />
        </>
      )}

      <ConfirmModal
        modalOpen={deleteConfirmModal}
        setModalOpen={setDeleteConfirmModal}
        title={'Do you want to permanently delete this recurring transaction?'}
        loading={actionLoading}
        handleSubmit={confirmDelete}
        afterClose={() => {
          setDeleteId(null);
        }}
      />
    </div>
  );
};

export default Page;
