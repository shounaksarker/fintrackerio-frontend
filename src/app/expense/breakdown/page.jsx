'use client';

import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import ScaleChart from '@/components/chart/Scale';
import getBreakdown from '@/helpers/frontend/getBreakdown';
import ExpenseCard from '@/components/ExpenseCard';
import { EXPENSE_RECORD_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import Loader from '@/components/fields/Loader';
import { DataContext } from '@/context/DataContext';

const Page = () => {
  const {
    dateRange,
    previousDateRange,
    expenseCategory,
    allTerminals,
    fetchTerminal,
    fetchExpenseRecord,
    balance,
    fetchBalance,
    fetchExpenseCategory,
  } = useContext(DataContext);
  const [recentMonthData, setRecentMonthData] = useState([]);
  const [pastMonthData, setPastMonthData] = useState([]);
  const [currentMonthAmounts, setCurrentMonthAmounts] = useState([]);
  const [prevMonthAmounts, setPrevMonthAmounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const processData = (response) => {
    const daysInMonth = moment().daysInMonth();
    const dataArray = Array(daysInMonth).fill(0);

    response.forEach((expense) => {
      const expenseDate = moment(expense.date).date();
      dataArray[expenseDate - 1] += parseFloat(expense.amount);
    });

    return dataArray;
  };

  const fetchExpenseData = async (dateRanges, set) => {
    const response = await axios.post(EXPENSE_RECORD_URL, dateRanges);
    if (response.data.success) {
      set(response.data.data);
      return response.data.data;
    }

    notification(response.data.msg || 'Failed to load Expense data.', { type: 'error', id: 'expenseError' });
  };

  const fetchData = async () => {
    setLoading(true);
    // Fetch expense data for the current month and previous month
    const [currentMonthResponse, prevMonthResponse] = await Promise.all([
      fetchExpenseData(dateRange, setRecentMonthData),
      fetchExpenseData(previousDateRange, setPastMonthData),
    ]);
    const currentMonthArray = processData(currentMonthResponse);
    const prevMonthArray = processData(prevMonthResponse);

    setCurrentMonthAmounts(currentMonthArray);
    setPrevMonthAmounts(prevMonthArray);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    if (!Object.keys(balance).length) {
      fetchBalance();
    }
    if (!expenseCategory.length) {
      fetchExpenseCategory();
    }
    if (!allTerminals.length) {
      fetchTerminal();
    }
  }, [dateRange]);
  const generateDateLabels = () => {
    const currentMonth = moment().month();
    const dates = [];

    for (let i = 1; i <= moment().daysInMonth(); i++) {
      const date = moment().month(currentMonth).date(i);
      dates.push(date.format('D ddd'));
    }
    return dates;
  };

  const dateAndDays = generateDateLabels();

  const { currentMonthBreakdown } = getBreakdown(recentMonthData, pastMonthData);

  return (
    <>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="page-shell">
          <div className="app-surface rounded-3xl p-4 md:p-6">
            <div className="mb-5">
              <h1 className="page-title">Expense Comparison</h1>
              <p className="page-subtitle">This month compared with the previous month by day.</p>
            </div>
            <ScaleChart
              className={'h-[280px] md:h-[360px]'}
              xLabel={dateAndDays}
              data={[
                { label: 'This Month', data: currentMonthAmounts, hoverBackgroundColor: '#1d756c' },
                { label: 'Prev Month', data: prevMonthAmounts, backgroundColor: '#ff63844d' },
              ]}
            />
          </div>
          {Object.entries(currentMonthBreakdown).length ? (
            <div>
              <div className="mb-5">
                <h1 className="page-title">Expense Breakdown</h1>
                <p className="page-subtitle">Tap a category to compare, or a row to inspect spending.</p>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Object.entries(currentMonthBreakdown).map(([categoryName, categoryData]) => (
                  <ExpenseCard
                    key={categoryName}
                    categoryName={categoryName}
                    categoryData={categoryData}
                    expenseCategory={expenseCategory}
                    allTerminals={allTerminals}
                    balance={balance}
                    fetchBalance={fetchBalance}
                    fetchData={fetchData}
                    fetchExpenseRecord={fetchExpenseRecord}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Page;
