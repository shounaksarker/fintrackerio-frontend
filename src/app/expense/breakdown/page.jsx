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
  const { dateRange, previousDateRange } = useContext(DataContext);
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
        <div>
          <div className="my-12 md:mt-6">
            <h1 className="mb-8 text-center text-2xl font-medium text-pBlack">Expense Comparison</h1>
            <ScaleChart
              className={'md:h-full'}
              xLabel={dateAndDays}
              data={[
                { label: 'This Month', data: currentMonthAmounts, hoverBackgroundColor: '#1d756c' },
                { label: 'Prev Month', data: prevMonthAmounts, backgroundColor: '#ff63844d' },
              ]}
            />
          </div>
          <div>
            <h1 className="mb-8 text-center text-2xl font-medium text-pBlack">Expense Breakdown</h1>
            <div className="flex flex-wrap gap-y-5 md:justify-between xl:justify-start">
              {Object.entries(currentMonthBreakdown).map(([categoryName, categoryData]) => (
                <ExpenseCard key={categoryName} categoryName={categoryName} categoryData={categoryData} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
