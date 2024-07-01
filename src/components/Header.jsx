'use client';

import React, { useContext } from 'react';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import ChevronRight from '@/assets/svg/Icon/ChevronRight';
import DateRangePicker from '@/components/fields/DateRangePicker';
import { DataContext } from '@/context/DataContext';
import { AUTH_PATH, HIDDEN_DATE_RANGE_PATH } from '@/assets/constants/conditionalPath';

const Header = () => {
  const { user, sidebarOpen } = useContext(DataContext);
  const pathName = usePathname();
  const isAuthPage = AUTH_PATH.includes(pathName);
  const isDateRangeHidden = HIDDEN_DATE_RANGE_PATH.includes(pathName);

  return (
    <>
      {!isAuthPage && (
        <div className="flex flex-col pt-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-x-4">
            <div>
              Hello <span className="font-semibold capitalize">{user?.username}</span>
            </div>
            <div className="flex gap-x-0">
              <ChevronRight />
              <ChevronRight className={'-ml-3'} />
            </div>
            <div className="text-sm text-pGray">{moment().format('MMMM DD, YYYY')}</div>
          </div>
          {!isDateRangeHidden && <DateRangePicker className={sidebarOpen ? '-z-50' : 'z-10'} />}
        </div>
      )}
    </>
  );
};

export default Header;
