import moment from 'moment';

const getDate = (date) => {
  return moment(date).format('DD/MM/YY');
};

const getTime = (date) => {
  return moment(date).format('h:mm A');
};

const getDateRange = (month = moment().month() + 1, year = moment().year()) => {
  if (month === 0) {
    month = 12;
    year -= 1;
  }
  const firstDate = moment([year, month - 1])
    .startOf('month')
    .format('YYYY-MM-DD');
  const lastDate = moment([year, month - 1])
    .endOf('month')
    .format('YYYY-MM-DD');
  return { from: firstDate, to: lastDate };
};

const getDateTime = (date) => {
  return moment(date).format('DD/MM/YY h:mm A');
};

export const getPreviousMonthDateRange = (dateRange) => {
  const getPreviousMonth = (year, month) => {
    if (month === 1) {
      return { year: year - 1, month: 12 };
    }
    return { year, month: month - 1 };
  };

  const { from, to } = dateRange;
  if (from && to) {
    const fromDate = moment(from);
    const toDate = moment(to);

    const previousFrom = getPreviousMonth(fromDate.year(), fromDate.month() + 1);
    const previousTo = getPreviousMonth(toDate.year(), toDate.month() + 1);

    const previousFromDate = moment([
      previousFrom.year,
      previousFrom.month - 1,
      Math.min(fromDate.date(), moment([previousFrom.year, previousFrom.month - 1]).daysInMonth()),
    ]);
    const previousToDate = moment([
      previousTo.year,
      previousTo.month - 1,
      Math.min(toDate.date(), moment([previousTo.year, previousTo.month - 1]).daysInMonth()),
    ]);

    return {
      from: previousFromDate.format('YYYY-MM-DD'),
      to: previousToDate.format('YYYY-MM-DD'),
    };
  }
};

export { getDate, getTime, getDateRange, getDateTime };
