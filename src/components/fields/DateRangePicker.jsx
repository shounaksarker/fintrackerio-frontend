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
    <div className="flex flex-row items-center justify-start gap-1 sm:gap-2 md:w-auto md:justify-center lg:justify-end">
      <div
        className={`custom-border h-11 w-3/5 py-1 md:w-full ${startDate && endDate ? 'max-w-72' : 'max-w-52'} ${className}`}
      >
        <DatePicker
          showIcon
          onChange={onChange}
          selected={startDate}
          calendarClassName=""
          className="ml-2 w-[90%] bg-transparent font-normal text-finance-ink placeholder:text-sm placeholder:text-finance-muted/80 sm:placeholder:text-base"
          dateFormat={'dd/MM/yyyy'}
          placeholderText="Select Date Range"
          withPortal
          selectsRange
          startDate={startDate}
          endDate={endDate}
          isClearable
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onFocus={(e) => e.target.blur()}
        >
          <div className="border-t border-finance-border p-2 text-center text-sm font-medium">
            {!startDate && <span className="text-finance-ink">Select a start date</span>}
            {startDate && !endDate && (
              <span className="animate-pulse text-finance-orange">Now select an end date</span>
            )}
            {startDate && endDate && <span className="text-finance-success">Range selected</span>}
          </div>
        </DatePicker>
      </div>
      {user?.start_date && (
        <Button
          color="secondary"
          onClick={lifeTimeRecord}
          className={
            'h-10 w-2/5 max-w-fit !border-finance-border/70 !bg-transparent !px-1 text-xs font-medium !text-finance-muted !shadow-none hover:!border-finance-border hover:!bg-white/45 hover:!text-finance-ink sm:max-w-fit sm:!px-2 sm:text-sm'
          }
        >
          Lifetime Records
        </Button>
      )}
    </div>
  );
};

export default DateRangePicker;
