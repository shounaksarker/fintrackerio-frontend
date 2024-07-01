import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = (
  onChange,
  calendarClassName,
  className,
  startDate,
  endDate,
  dateFormat = 'dd/MM/yyyy',
  showIcon = false,
  isClearable = false,
  closeOnScroll = false,
  selectsRange = false,
  placeholderText = 'Select Date',
  selected = new Date(),
  withPortal = false
) => {
  return (
    <DatePicker
      showIcon={showIcon}
      isClearable={isClearable}
      closeOnScroll={closeOnScroll}
      selected={selected}
      onChange={onChange}
      calendarClassName={calendarClassName}
      className={className}
      dateFormat={dateFormat}
      startDate={startDate}
      endDate={endDate}
      selectsRange={selectsRange}
      placeholderText={placeholderText}
      withPortal={withPortal}
    />
  );
};

export default DateInput;
