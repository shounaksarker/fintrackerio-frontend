'use client';

import React from 'react';
import Image from 'next/image';
import Modal from '@/components/fields/Modal';
import { CURRENCY } from '@/assets/constants';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { formattedAmount } from '@/helpers/frontend/getSum';

const ExpenseBreakdownModal = ({ isOpen, setIsOpen, afterClose, modalData, categoryData, categoryName }) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      afterClose={afterClose}
      showCloseButton
      className="mx-2 p-6 shadow-xl shadow-black/40"
    >
      <div className="text-sBlack">
        <h1 className="mb-6 flex items-center justify-center gap-x-2 border-b pb-2 text-2xl font-bold text-pBlack">
          <Image src={categoryData.icon || targetArrowIcon} alt="" width={20} height={20} />
          <span>Expense Details</span>
        </h1>

        {modalData && (
          <div className="space-y-4 text-sm">
            <InfoRow label="📂 Category:" value={categoryName} />
            <InfoRow label="🛒 Spend On:" value={modalData.name} />
            <InfoRow label="💰 Amount:" value={`${CURRENCY} ${formattedAmount(modalData.amount)}`} />
            <InfoRow label="🏦 Spent From:" value={modalData.terminal || '-'} capitalize />
            <InfoRow label="📅 Date:" value={modalData.date} />
            <InfoRow
              label="📝 Description:"
              labelClass="min-w-28"
              value={
                modalData.description ? (
                  modalData.description
                ) : (
                  <em className="text-gray-400">No description</em>
                )
              }
              wrap
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

const InfoRow = ({ label, labelClass, value, capitalize = false, wrap = false }) => (
  <div className={`flex items-start gap-x-2 ${capitalize ? 'capitalize' : ''}`}>
    <span className={`w-28 font-semibold text-gray-700 ${labelClass}`}>{label}</span>
    <span className={`text-gray-900 ${wrap ? 'break-words' : ''} ${capitalize ? 'capitalize' : ''}`}>
      {value}
    </span>
  </div>
);

export default ExpenseBreakdownModal;
