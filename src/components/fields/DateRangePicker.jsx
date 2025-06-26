'use client';

import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { getDateRange, getPreviousMonthDateRange } from '@/helpers/frontend/formateDate';
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from '@/context/DataContext';
import Button from './Button';

const DateRangePicker = ({ className }) => {
  const {
    dateRange,
    setPreviousDateRange,
    setDateRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    user,
    callMultipleFunctions,
  } = useContext(DataContext);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (dates[0] === null && dates[1] === null) {
      setDateRange(getDateRange());
      setPreviousDateRange(getPreviousMonthDateRange(dateRange));
      callMultipleFunctions();
    }
  };
  const lifeTimeRecord = () => {
    onChange([user.start_date, new Date()]);
  };

  const isdateChange = (obj1, obj2) => {
    return !(obj1.from === obj2.from && obj1.to === obj2.to);
  };

  useEffect(() => {
    const range = {
      from: moment(startDate).format('YYYY-MM-DD'),
      to: moment(endDate).format('YYYY-MM-DD'),
    };
    if (startDate && endDate && isdateChange(dateRange, range)) {
      setDateRange(range);
      setPreviousDateRange(getPreviousMonthDateRange(range));
    }
  }, [startDate, endDate]);
  return (
    <div
      className={`mt-2 flex flex-col justify-start sm:flex-row md:mt-0 md:w-1/2 md:items-center md:justify-center lg:justify-end`}
    >
      <div
        className={`custom-border mb-2 h-11 w-[70%] py-1 md:w-full ${startDate && endDate ? 'max-w-72' : 'max-w-52'} ${className}`}
      >
        <DatePicker
          showIcon
          onChange={onChange}
          selected={startDate}
          calendarClassName=""
          className="ml-2 w-[90%] font-normal text-pBlack"
          dateFormat={'dd/MM/yyyy'}
          placeholderText="Select Date Range"
          withPortal
          selectsRange
          startDate={startDate}
          endDate={endDate}
          isClearable
        />
      </div>
      {user?.start_date && (
        <Button
          onClick={lifeTimeRecord}
          className={
            'mb-2 h-11 max-w-fit !bg-slate-300 !px-2 text-sm font-medium !text-sGray hover:!bg-slate-400 hover:!text-white sm:ml-2'
          }
        >
          Lifetime Records
        </Button>
      )}
    </div>
  );
};

export default DateRangePicker;
