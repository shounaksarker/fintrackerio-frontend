import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { CURRENCY } from '@/assets/constants';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { formattedAmount } from '@/helpers/frontend/getSum';

const IncomeExpenseList = ({ name, category, amount, date, icon }) => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl p-2 transition-colors focus-within:bg-finance-panel hover:bg-finance-panel md:gap-3">
      <div className="flex min-w-0 flex-1 items-center gap-x-2 md:gap-x-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-finance-panel md:size-11">
          <Image src={icon || targetArrowIcon} alt="icon" width={24} height={24} />
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden capitalize">
          <span className="truncate text-sm font-bold text-finance-ink">{name}</span>
          <span className="truncate text-[11px] font-medium text-finance-muted md:text-sm">
            {category || '-'}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-y-0.5 md:gap-y-1">
        <span className="text-xs font-black text-finance-ink md:text-sm">
          {CURRENCY}
          {formattedAmount(amount)}
        </span>
        <span className="text-[11px] font-medium text-finance-muted md:text-xs">
          {moment(date).format('DD MMM, yyyy')}
        </span>
      </div>
    </div>
  );
};

export default IncomeExpenseList;
