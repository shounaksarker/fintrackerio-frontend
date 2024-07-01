import React from 'react';
import Housing from '@/assets/svg/Icon/Housing';
import { CURRENCY } from '@/assets/constants';
import DownArrowGreen from '@/assets/svg/Icon/DownArrowGreen';

const ExpenseCard = ({ categoryName, categoryData }) => {
  return (
    <div className="w-full rounded-md md:w-1/2 md:px-3 xl:w-1/3">
      <div className="flex items-center justify-between rounded-t-md bg-lightGray p-3">
        <div className="flex items-center justify-start gap-x-2">
          <span className="rounded-lg bg-lightGray-200 p-4">
            <Housing />
          </span>
          <div>
            <h4 className="text-lg font-bold capitalize text-pGray">{categoryName}</h4>
            <h2 className="text-lg font-medium text-pBlack">
              {CURRENCY} {categoryData.totalAmount}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-x-2 text-pGray">
            {categoryData.comparison.percentage || 0} <DownArrowGreen />
          </div>
          <span className="text-xs font-light text-sGray">Compare to previous month</span>
        </div>
      </div>

      <div className="h-36 overflow-y-scroll rounded-b-md border">
        {categoryData.spendsOn.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-bGray px-3 py-4 text-sBlack"
          >
            <span className="capitalize">{item.name}</span>
            <div className="flex flex-col items-end">
              <span>
                {CURRENCY} {item.amount}
              </span>
              <span className="text-xs text-lightGray-300">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseCard;
