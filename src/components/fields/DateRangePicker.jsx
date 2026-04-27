'use client';

import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DatePicker from 'react-datepicker';
import { getDateRange, getPreviousMonthDateRange } from '@/helpers/frontend/formateDate';
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from '@/context/DataContext';
import Button from './Button';

const DateRangePicker = ({ className }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
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
    if (start && end) {
      setPickerOpen(false);
    }
  };

  const clearDateRange = () => {
    onChange([null, null]);
    setPickerOpen(false);
  };

  const lifeTimeRecord = () => {
    onChange([user.start_date, new Date()]);
  };

  const isdateChange = (obj1, obj2) => {
    return !(obj1.from === obj2.from && obj1.to === obj2.to);
  };

  const dateLabel =
    startDate && endDate
      ? `${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`
      : 'Select Date Range';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!pickerOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverflowX = document.body.style.overflowX;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverflowX = document.documentElement.style.overflowX;

    document.body.style.overflow = 'hidden';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overflowX = previousBodyOverflowX;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overflowX = previousHtmlOverflowX;
    };
  }, [pickerOpen]);

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
    <div className="flex w-full flex-row items-center justify-start gap-1 sm:gap-2 md:w-auto md:justify-center lg:justify-end">
      <div
        className={`custom-border h-11 min-w-0 flex-1 py-1 md:w-64 md:flex-none ${startDate && endDate ? 'md:max-w-72' : 'md:max-w-52'} ${className}`}
      >
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="flex size-full items-center gap-2 truncate px-3 text-left text-sm font-normal text-finance-ink"
        >
          <svg
            className="size-4 shrink-0 text-finance-ink"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 3V6M17 3V6M4 9H20M6 5H18C19.1046 5 20 5.89543 20 7V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7C4 5.89543 4.89543 5 6 5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="min-w-0 flex-1 truncate">{dateLabel}</span>
          {startDate || endDate ? (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear date range"
              className="flex size-5 shrink-0 items-center justify-center rounded-full text-finance-muted transition hover:bg-finance-panel hover:text-pRed"
              onClick={(event) => {
                event.stopPropagation();
                clearDateRange();
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  event.stopPropagation();
                  clearDateRange();
                }
              }}
            >
              <svg
                className="size-3.5"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          ) : null}
        </button>
      </div>
      {user?.start_date && (
        <Button
          color="secondary"
          onClick={lifeTimeRecord}
          className={
            'h-10 shrink-0 !border-finance-border/70 !bg-transparent !px-1 text-xs font-medium !text-finance-muted !shadow-none hover:!border-finance-border hover:!bg-white/50 hover:!text-finance-ink sm:!px-2 sm:text-sm'
          }
        >
          Lifetime Records
        </Button>
      )}
      {mounted &&
        pickerOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[2147483647] flex h-dvh w-full max-w-full items-start justify-center overflow-y-auto overflow-x-hidden bg-gray-950/70 p-3 backdrop-blur-sm sm:items-center"
            onClick={() => setPickerOpen(false)}
          >
            <div
              className="max-w-[calc(100dvw-1.5rem)] rounded-2xl border border-finance-border bg-white p-3 shadow-card"
              onClick={(event) => event.stopPropagation()}
            >
              <DatePicker
                inline
                onChange={onChange}
                selected={startDate}
                calendarClassName="date-range-calendar"
                selectsRange
                startDate={startDate}
                endDate={endDate}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
              >
                <div className="border-t border-finance-border p-2 text-center text-sm font-medium">
                  {!startDate && <span className="text-finance-ink">Select a start date</span>}
                  {startDate && !endDate && (
                    <span className="animate-pulse text-finance-orange">Now select an end date</span>
                  )}
                  {startDate && endDate && <span className="text-finance-success">Range selected</span>}
                </div>
              </DatePicker>
              <div className="mt-3 flex items-center justify-between gap-2">
                <Button color="secondary" className="!px-3 !py-1.5 text-xs" onClick={clearDateRange}>
                  Clear
                </Button>
                <Button className="!px-3 !py-1.5 text-xs" onClick={() => setPickerOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DateRangePicker;
