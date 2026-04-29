'use client';

import React, { useContext, useEffect, useState } from 'react';
import DoughnutChart from '@/components/chart/Doughnut';
import Loader from '@/components/fields/Loader';
import EmptyState from '@/components/fields/EmptyState';
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
      title: `${transection} summary`,
      showRecentTransection: transection,
    });
  };

  const recentTransectionStyle = (transection) => {
    return inExDetails.showRecentTransection === transection
      ? 'bg-gray-950 text-white shadow-soft'
      : 'text-finance-muted hover:bg-finance-panel hover:text-finance-ink';
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
    <section className="grid grid-cols-1 gap-4 md:gap-5 xl:grid-cols-[minmax(360px,0.88fr)_minmax(0,1.12fr)]">
      <div className="app-surface rounded-3xl p-3 md:p-5">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mb-4">
          <div>
            <h3 className="text-lg font-black text-finance-ink">Recent Transactions</h3>
            <p className="text-xs font-medium text-finance-muted">Latest records for selected period</p>
          </div>
          <div className="flex w-fit rounded-xl border border-finance-border bg-white/70 p-1 text-sm font-bold">
            <button
              type="button"
              className={`rounded-lg px-3 py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-pest/20 ${recentTransectionStyle('income')}`}
              onClick={() => recentTransectionToggle('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`rounded-lg px-3 py-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-pest/20 ${recentTransectionStyle('expense')}`}
              onClick={() => recentTransectionToggle('expense')}
            >
              Expense
            </button>
          </div>
        </div>

        {(incomeLoading || expenseLoading) && (
          <div className="flex h-52 w-full items-center justify-center">
            <Loader />
          </div>
        )}

        <div className="scrollbar-thin flex max-h-[260px] flex-col gap-1 overflow-y-auto pr-1 md:max-h-[360px] xl:max-h-[390px]">
          {inExDetails.showRecentTransection === 'income' ? (
            <>
              {!incomeLoading && !incomeData.length && (
                <EmptyState
                  compact
                  title="No income yet"
                  description="Income records for the selected period will appear here."
                  className="min-h-[220px]"
                />
              )}
              {incomeData.map((income, i) => (
                <IncomeExpenseList
                  key={i}
                  name={income.income_category_name}
                  category={income.description}
                  amount={income.amount}
                  date={income.date}
                  icon={income.icon}
                />
              ))}
            </>
          ) : (
            <>
              {!expenseLoading && !expenseData.length && (
                <EmptyState
                  compact
                  title="No expense yet"
                  description="Expense records for the selected period will appear here."
                  className="min-h-[220px]"
                />
              )}
              {expenseData.map((expense, i) => (
                <IncomeExpenseList
                  key={i}
                  name={expense.spend_on}
                  category={expense.expense_category_name}
                  amount={expense.amount}
                  date={expense.date}
                  icon={expense.icon}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {(incomeData.length !== 0 || expenseData.length !== 0) && (
        <div className="app-surface flex min-h-[300px] flex-col rounded-3xl p-4 md:min-h-[340px] md:p-5 xl:min-h-[390px]">
          <div className="mb-2 md:mb-4">
            <h3 className="text-lg font-black capitalize text-finance-ink">{inExDetails.title}</h3>
            <p className="text-xs font-medium text-finance-muted">Distribution of current records</p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <DoughnutChart
              title={inExDetails.title}
              titleStyle={{
                color: '#101828',
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
              className="h-[230px] w-full max-w-[420px] sm:h-[260px] md:h-[280px] md:max-w-[460px] xl:h-[300px]"
            />
          </div>
        </div>
      )}
      {incomeData.length === 0 && expenseData.length === 0 && !incomeLoading && !expenseLoading && (
        <EmptyState
          compact
          title="Charts will appear after records"
          description="Add income or expense to see a clean distribution chart for the selected period."
          className="min-h-[240px] md:min-h-[340px] xl:min-h-[390px]"
        />
      )}
    </section>
  );
};

export default RecentTransection;
