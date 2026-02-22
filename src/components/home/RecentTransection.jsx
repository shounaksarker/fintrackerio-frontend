'use client';

import React, { useContext, useEffect, useState } from 'react';
import DoughnutChart from '@/components/chart/Doughnut';
import Loader from '@/components/fields/Loader';
import IncomeExpenseList from '@/components/IncomeExpenseList';
import getBreakdown from '@/helpers/frontend/getBreakdown';
import { getNameAndAmount } from '@/helpers/frontend/handle';
import { DataContext } from '@/context/DataContext';
import { IN_EX_DETAILS_VALUE } from '@/assets/constants/stateValue';

const RecentTransection = () => {
  const {
    dateRange,
    fetchForce,
    endDate,
    incomeData,
    incomeLoading,
    fetchIncomeRecord,
    expenseData,
    expenseLoading,
    fetchExpenseRecord,
  } = useContext(DataContext);
  const [inExDetails, setInExDetails] = useState(IN_EX_DETAILS_VALUE);

  const recentTransectionToggle = (transection) => {
    setInExDetails({
      ...inExDetails,
      title: `${transection} summery`,
      showRecentTransection: transection,
    });
  };
  const recentTransectionStyle = (transection) => {
    return inExDetails.showRecentTransection === transection
      ? 'text-semibold text-pest underline underline-offset-8 decoration-2 text-md'
      : 'text-pGray text-sm';
  };

  useEffect(() => {
    if (!incomeData.length || fetchForce || endDate) {
      fetchIncomeRecord();
    }
    if (!expenseData.length || fetchForce || endDate) {
      fetchExpenseRecord();
    }
  }, [dateRange]);

  useEffect(() => {
    const { currentMonthBreakdown: incomeBreakdown } = getBreakdown(incomeData, [], 'income_category_name');
    const { currentMonthBreakdown: expenseBreakdown } = getBreakdown(expenseData);

    const { names: incomeNames, amounts: incomeAmounts } = getNameAndAmount(incomeBreakdown);
    const { names: expenseNames, amounts: expenseAmounts } = getNameAndAmount(expenseBreakdown);
    setInExDetails({
      ...inExDetails,
      incomeNames,
      incomeAmounts,
      expenseNames,
      expenseAmounts,
    });
  }, [incomeData, expenseData]);
  return (
    <div className="flex w-full flex-col gap-y-5 p-3 md:flex-row md:justify-between md:gap-y-0">
      <div className="w-full md:w-1/2 xl:w-[32%]">
        <h3 className="mb-4 text-lg font-semibold text-pGray">Recent Transection</h3>
        <div className="border shadow-md">
          <div className="mb- flex gap-x-3 bg-white px-5 py-3 shadow-[0px_3px_2px_#a7a7a745]">
            <button
              className={recentTransectionStyle('income')}
              onClick={() => recentTransectionToggle('income')}
            >
              Income
            </button>
            <button
              className={recentTransectionStyle('expense')}
              onClick={() => recentTransectionToggle('expense')}
            >
              Expense
            </button>
          </div>
          {(incomeLoading || expenseLoading) && (
            <div className={'flex h-44 w-full items-center justify-center'}>
              <Loader />
            </div>
          )}
          <div className="scrollbar-hidden flex max-h-[360px] flex-col divide-y divide-lightGray-200 overflow-y-scroll px-2 pt-2">
            {inExDetails.showRecentTransection === 'income' ? (
              <div>
                {!incomeLoading && !incomeData.length && <p className="py-4 text-center">List is empty</p>}
                {incomeData.map((income, i) => {
                  return (
                    <IncomeExpenseList
                      key={i}
                      name={income.income_category_name}
                      category={income.description}
                      amount={income.amount}
                      date={income.date}
                      icon={income.icon}
                    />
                  );
                })}
              </div>
            ) : (
              <div>
                {!expenseLoading && !expenseData.length && <p className="py-4 text-center"> List is empty</p>}
                {expenseData.map((expense, i) => {
                  return (
                    <IncomeExpenseList
                      key={i}
                      name={expense.spend_on}
                      category={expense.expense_category_name}
                      amount={expense.amount}
                      date={expense.date}
                      icon={expense.icon}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      {(incomeData.length !== 0 || expenseData.length !== 0) && (
        <div className="flex size-full justify-center md:max-h-[482px] md:w-1/2 xl:w-[65%]">
          <DoughnutChart
            title={inExDetails.title}
            titleStyle={{
              color: '#299D91',
              fontSize: 16,
              fontWeight: 'bold',
            }}
            data={
              inExDetails.showRecentTransection === 'income'
                ? inExDetails.incomeAmounts
                : inExDetails.expenseAmounts
            }
            labels={
              inExDetails.showRecentTransection === 'income'
                ? inExDetails.incomeNames
                : inExDetails.expenseNames
            }
            className="size-full xl:w-[500px]"
          />
        </div>
      )}
    </div>
  );
};

export default RecentTransection;
