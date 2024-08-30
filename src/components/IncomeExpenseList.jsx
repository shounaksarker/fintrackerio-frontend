import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { CURRENCY } from '@/assets/constants';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { formattedAmount } from '@/helpers/frontend/getSum';

const IncomeExpenseList = ({ name, category, amount, date, icon }) => {
  return (
    <div className="flex justify-between py-2">
      <div className="flex w-[65%] items-center gap-x-2">
        <div className="rounded-md bg-lightGray/50 p-2">
          <Image src={icon || targetArrowIcon} alt="icon" width={27} height={27} />
        </div>
        <div className="flex flex-col overflow-hidden capitalize">
          <span className="truncate text-base font-semibold">{name}</span>
          <span className="truncate text-sm text-lightGray-300">{category || '-'}</span>
        </div>
      </div>
      <div className="flex w-[31%] flex-col items-end gap-y-1">
        <span className="text-base font-semibold">
          {CURRENCY} {formattedAmount(amount)}
        </span>
        <span className="text-xs text-lightGray-300 sm:text-sm">{moment(date).format('DD MMM, yyyy')}</span>
      </div>
    </div>
  );
};

export default IncomeExpenseList;
