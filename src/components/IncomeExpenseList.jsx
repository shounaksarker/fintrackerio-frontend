import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import { CURRENCY } from '@/assets/constants';
import targetArrowIcon from '@/assets/svg/targetArrow.svg';
import { formattedAmount } from '@/helpers/frontend/getSum';

const IncomeExpenseList = ({ name, category, amount, date, icon }) => {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl p-2 transition hover:bg-finance-panel">
      <div className="flex min-w-0 flex-1 items-center gap-x-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-finance-panel">
          <Image src={icon || targetArrowIcon} alt="icon" width={27} height={27} />
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden capitalize">
          <span className="truncate text-sm font-bold text-finance-ink md:text-base">{name}</span>
          <span className="truncate text-xs font-medium text-finance-muted md:text-sm">
            {category || '-'}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-y-1">
        <span className="text-sm font-black text-finance-ink md:text-base">
          {CURRENCY}
          {formattedAmount(amount)}
        </span>
        <span className="text-xs font-medium text-finance-muted">{moment(date).format('DD MMM, yyyy')}</span>
      </div>
    </div>
  );
};

export default IncomeExpenseList;
