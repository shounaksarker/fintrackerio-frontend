'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CURRENCY } from '@/assets/constants';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { formattedAmount } from '@/helpers/frontend/getSum';
import Modal from './fields/Modal';

const ExpenseCard = ({ categoryName, categoryData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const showDetails = (item) => {
    console.log('Clicked item:', item);
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
  return (
    <div className="w-full rounded-md md:w-1/2 md:px-3 xl:w-1/3">
      <div className="flex items-center justify-between rounded-t-md bg-lightGray p-3">
        <div className="flex items-center justify-start gap-x-2">
          <span className="rounded-lg bg-lightGray-200 p-2">
            <Image src={categoryData.icon || targetArrowIcon} alt="icon" width={32} height={32} />
          </span>
          <div>
            <h4 className="font-bold capitalize text-pGray">{categoryName}</h4>
            <h2 className="text-sm font-medium text-pBlack">
              {CURRENCY} {formattedAmount(categoryData.totalAmount)}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-x-2 text-sm text-pGray">
            {handlePercentage(Number(categoryData.comparison.percentage))}
          </div>
          <span className="text-[7px] font-light text-sGray">Compare to previous month</span>
        </div>
      </div>

      <div className="max-h-36 divide-y-2 divide-bGray overflow-y-scroll rounded-b-md border md:h-32">
        {categoryData.spendsOn.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 text-sBlack ${categoryData.spendsOn.length === 1 ? 'border-b-2 border-bGray' : ''}`}
            onClick={() => showDetails(item)}
          >
            <span className="text-sm capitalize">{item.name}</span>
            <div className="flex flex-col items-end text-sm">
              <span>
                {CURRENCY} {formattedAmount(item.amount)}
              </span>
              <span className="text-xs text-lightGray-300">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        showCloseButton
        afterClose={() => setModalData(null)}
        className={'mx-2 p-6 shadow-xl shadow-black/40'}
      >
        <div className="text-sBlack">
          <h1 className="mb-6 flex items-center justify-center gap-x-2 border-b pb-2 text-2xl font-bold text-pBlack">
            <Image src={categoryData.icon || targetArrowIcon} alt="" width={20} height={20} />
            <span>Expense Details</span>
          </h1>

          {modalData && (
            <div className="space-y-4 text-sm">
              {/* Category */}
              <div className="flex items-start gap-x-2 capitalize">
                <span className="w-28 font-semibold text-gray-700">📂 Category:</span>
                <span className="text-gray-900">{categoryName}</span>
              </div>

              {/* Spend On */}
              <div className="flex items-start gap-x-2 capitalize">
                <span className="w-28 font-semibold text-gray-700">🛒 Spend On:</span>
                <span className="text-gray-900">{modalData.name}</span>
              </div>

              {/* Amount */}
              <div className="flex items-start gap-x-2">
                <span className="w-28 font-semibold text-gray-700">💰 Amount:</span>
                <span className="text-gray-900">
                  {CURRENCY} {formattedAmount(modalData.amount)}
                </span>
              </div>
              {/* Spent From */}
              <div className="flex items-start gap-x-2">
                <span className="w-28 font-semibold text-gray-700">🏦 Spent From:</span>
                <span className="capitalize text-gray-900">{modalData.terminal || '-'}</span>
              </div>

              {/* Date */}
              <div className="flex items-start gap-x-2">
                <span className="w-28 font-semibold text-gray-700">📅 Date:</span>
                <span className="text-gray-900">{modalData.date}</span>
              </div>

              {/* Description */}
              <div className="flex items-start gap-x-2 capitalize">
                <span className="min-w-28 font-semibold text-gray-700">📝 Description:</span>
                <span className="break-words text-gray-900">
                  {modalData.description || <em className="text-gray-400">No description</em>}
                </span>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ExpenseCard;
