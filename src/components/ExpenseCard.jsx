'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CURRENCY } from '@/assets/constants';
import { EDIT_EXPENSE_RECORD_URL } from '@/helpers/frontend/apiEndpoints';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { formattedAmount } from '@/helpers/frontend/getSum';
import ComparisonModal from '@/components/modals/ComparisonModal';
import ExpenseBreakdownModal from './modals/ExpenseBreakdownModal';
import InsertExpenseModal from './modals/InsertExpenseModal';
import { notification } from '@/components/notification';

const ExpenseCard = ({
  categoryName,
  categoryData,
  expenseCategory,
  allTerminals,
  balance,
  fetchBalance,
  fetchData,
  fetchExpenseRecord,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [comparedModalOpen, setComparedModalOpen] = useState(false);
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [editExpenseDetails, setEditExpenseDetails] = useState();
  const [editExpenseLoading, setEditExpenseLoading] = useState(false);
  const [maxEditAmount, setMaxEditAmount] = useState(0);

  const showDetails = (item) => {
    setModalData(item);
    setModalOpen(true);
  };
  const handlePercentage = (percentage) => {
    if (percentage > 0) {
      return (
        <div className="text-red-500">
          {percentage}% <span className="text-[7px]">more</span>
        </div>
      );
    }
    if (percentage < 0) {
      return (
        <div className="text-green-500">
          {percentage * -1}% <span className="text-[7px]">less</span>
        </div>
      );
    }
    return <div>{percentage}%</div>;
  };

  const handleExpenseEdit = async (info) => {
    setEditExpenseDetails({
      record_id: info.record_id,
      amount: info.amount,
      expense_category_id: info.expense_category_id,
      spend_on: info.spend_on,
      terminal_id: info.terminal_id,
      date: info.date,
      description: info.description,
    });
    setMaxEditAmount(info.amount);
    setEditExpenseModal(true);
  };

  const submitEditExpense = async (e) => {
    e.preventDefault();
    setEditExpenseLoading(true);
    try {
      const res = await axios.put(EDIT_EXPENSE_RECORD_URL, editExpenseDetails);
      if (res.data.success) {
        notification(res.data.msg, { type: 'success', id: 'editExpense' });
        setEditExpenseDetails();
        setMaxEditAmount(0);
        fetchExpenseRecord();
        fetchBalance();
        await fetchData();
        setEditExpenseModal(false);
      } else {
        notification(res.data.msg || 'Failed to edit Expense Record.', {
          type: 'error',
          id: 'editExpense',
        });
      }
    } catch (error) {
      notification('Failed to edit Expense Record.', {
        type: 'error',
        id: 'editExpense',
      });
    }
    setEditExpenseLoading(false);
  };

  return (
    <div className="w-full">
      <div
        className="flex cursor-pointer items-center justify-between rounded-t-2xl border border-finance-border bg-gray-200 p-3 transition-colors duration-300 hover:shadow-card"
        onClick={() => setComparedModalOpen(true)}
      >
        <div className="flex items-center justify-start gap-x-2">
          <span className="rounded-xl bg-finance-panel p-2">
            <Image src={categoryData.icon || targetArrowIcon} alt="icon" width={32} height={32} />
          </span>
          <div>
            <h4 className="font-bold capitalize text-finance-ink">{categoryName}</h4>
            <h2 className="text-sm font-medium text-finance-muted">
              {CURRENCY} {formattedAmount(categoryData.totalAmount)}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-x-2 text-sm font-bold text-finance-ink">
            {handlePercentage(Number(categoryData.comparison.percentage))}
          </div>
          <span className="text-[10px] font-medium text-finance-muted">Tap to compare →</span>
        </div>
      </div>

      <div className="scrollbar-thin max-h-40 divide-y divide-finance-border overflow-y-auto rounded-b-2xl border-x border-b border-finance-border bg-white/75 md:h-36">
        {categoryData.spendsOn.map((item, index) => (
          <div
            key={index}
            className={`group/row flex cursor-pointer items-center justify-between p-3 text-finance-ink transition-colors duration-300 hover:bg-gradient-to-r hover:from-pest/10 hover:to-transparent ${categoryData.spendsOn.length === 1 ? 'border-b border-finance-border' : ''}`}
            onClick={() => showDetails(item)}
          >
            <span className="relative text-sm capitalize after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-pest after:transition-all after:duration-300 group-hover/row:after:w-full">
              {item.name}
            </span>
            <div className="flex items-center gap-x-2">
              <div className="flex flex-col items-end text-sm">
                <span>
                  {CURRENCY} {formattedAmount(item.amount)}
                </span>
                <span className="text-xs text-lightGray-300">{item.date}</span>
              </div>
              <span className="text-xs text-gray-400 transition-transform duration-200 group-hover/row:translate-x-0.5">
                ›
              </span>
            </div>
          </div>
        ))}
      </div>
      <ExpenseBreakdownModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        afterClose={() => setModalData(null)}
        modalData={modalData}
        categoryData={categoryData}
        categoryName={categoryName}
        CURRENCY={CURRENCY}
        formattedAmount={formattedAmount}
        targetArrowIcon={targetArrowIcon}
        onEdit={handleExpenseEdit}
      />
      <ComparisonModal
        isOpen={comparedModalOpen}
        setIsOpen={setComparedModalOpen}
        categoryName={categoryName}
        categoryData={categoryData}
      />
      {editExpenseModal && (
        <InsertExpenseModal
          title={'Edit Expense'}
          modalOpen={editExpenseModal}
          setModalOpen={setEditExpenseModal}
          loading={editExpenseLoading}
          expense={editExpenseDetails}
          setExpense={setEditExpenseDetails}
          expenseCategories={expenseCategory}
          terminals={allTerminals}
          terminalBalances={balance.terminal}
          maxAmount={maxEditAmount}
          setMaxAmount={setMaxEditAmount}
          handleSubmit={submitEditExpense}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default ExpenseCard;
