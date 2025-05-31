'use client';

import React from 'react';
import Image from 'next/image';
import Modal from '@/components/fields/Modal';
import { CURRENCY } from '@/assets/constants';
import { formattedAmount } from '@/helpers/frontend/getSum';

const ComparisonModal = ({ isOpen, setIsOpen, categoryData, categoryName }) => {
  const prevMonth = categoryData.comparison.prevMonthTotal;
  const thisMonth = categoryData.totalAmount;
  const difference = Math.abs(categoryData.comparison.difference).toFixed(2);
  const isSaving = prevMonth > thisMonth;

  const bgColor = isSaving ? 'from-green-100 to-green-200' : 'from-red-100 to-red-200';
  const textColor = isSaving ? 'text-green-900' : 'text-red-900';
  const labelColor = isSaving ? 'text-green-800' : 'text-red-800';

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      showCloseButton
      className="mx-4 w-full max-w-md rounded-xl bg-white p-6 text-gray-800 shadow-2xl shadow-black/40"
    >
      <h2 className="mb-3 text-center text-base font-semibold text-gray-700 md:text-xl">
        📊 Monthly Spending Comparison
      </h2>
      <h4 className="mb-8 flex items-center justify-center text-sm font-medium text-gray-700">
        <Image src={categoryData.icon} alt="" width={20} height={20} />
        <span className="ml-2 capitalize">{categoryName}</span>
      </h4>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">Previous Month</span>
          <span className="font-semibold text-gray-800">
            {CURRENCY} {formattedAmount(prevMonth.toFixed(2))}
          </span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-600">This Month</span>
          <span className="font-semibold text-gray-800">
            {CURRENCY} {formattedAmount(thisMonth.toFixed(2))}
          </span>
        </div>
        <div className={`mt-4 flex items-center justify-between rounded-lg bg-gradient-to-r p-3 ${bgColor}`}>
          <span className={`font-semibold ${labelColor}`}>Difference</span>
          <span className={`text-base font-bold md:text-lg ${textColor}`}>
            {CURRENCY} {formattedAmount(difference)}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default ComparisonModal;
