import React from 'react';
import Image from 'next/image';
import { CURRENCY } from '@/assets/constants';
import DownArrowGreen from '@/assets/svg/Icon/DownArrowGreen';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { formattedAmount } from '@/helpers/frontend/getSum';

const ExpenseCard = ({ categoryName, categoryData }) => {
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
          <div className="flex items-center gap-x-2 text-pGray">
            {categoryData.comparison.percentage || 0} <DownArrowGreen />
          </div>
          <span className="text-[7px] font-light text-sGray">Compare to previous month</span>
        </div>
      </div>

      <div className="max-h-36 divide-y-2 divide-bGray overflow-y-scroll rounded-b-md border md:h-32">
        {categoryData.spendsOn.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 text-sBlack ${categoryData.spendsOn.length === 1 ? 'border-b-2 border-bGray' : ''}`}
          >
            <span className="text-sm capitalize">{item.name}</span>
            <div className="flex flex-col items-end text-sm">
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
