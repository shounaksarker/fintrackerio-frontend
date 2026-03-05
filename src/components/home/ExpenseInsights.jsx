'use client';

import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '@/context/DataContext';
import TipsModal from '@/components/modals/TipsModal';
import { EXPENSE_INSIGHTS_MANUALS, CURRENCY } from '@/assets/constants';
import { formattedAmount } from '@/helpers/frontend/getSum';

const ExpenseInsights = () => {
  const { yearlySummery } = useContext(DataContext);
  const [tipsModalOpen, setTipsModalOpen] = useState(false);

  const insights = useMemo(() => {
    if (!yearlySummery || !yearlySummery.months.length) return [];

    const { expenses, incomes } = yearlySummery;

    // Find current month index (assuming the last non-zero or the current month index)
    // Actually, yearlySummery returns all months. We can find the last month with data
    let currentIdx = -1;
    for (let i = expenses.length - 1; i >= 0; i--) {
      if (expenses[i] > 0 || incomes[i] > 0) {
        currentIdx = i;
        break;
      }
    }

    if (currentIdx < 1)
      return [
        { icon: '📉', text: 'Not enough historical data for trend insights yet.', color: 'text-gray-500' },
      ];

    const currentMonthExpense = expenses[currentIdx];
    const lastMonthExpense = expenses[currentIdx - 1];

    const currentMonthIncome = incomes[currentIdx];
    const lastMonthIncome = incomes[currentIdx - 1];

    const currentSavings = currentMonthIncome - currentMonthExpense;
    const lastSavings = lastMonthIncome - lastMonthExpense;

    const items = [];

    // Expense Trend
    if (lastMonthExpense > 0) {
      const diff = currentMonthExpense - lastMonthExpense;
      const percent = Math.abs((diff / lastMonthExpense) * 100).toFixed(1);

      if (diff > 0) {
        items.push({
          icon: '📈',
          text: `You've spent ${percent}% more (${CURRENCY}${formattedAmount(diff)}) this month compared to last month.`,
          color: 'text-red-500',
          bg: 'bg-red-50',
        });
      } else if (diff < 0) {
        items.push({
          icon: '📉',
          text: `Great! You've spent ${percent}% less (${CURRENCY}${formattedAmount(Math.abs(diff))}) than last month.`,
          color: 'text-green-600',
          bg: 'bg-green-50',
        });
      } else {
        items.push({
          icon: '➖',
          text: `Your spending is exactly the same as last month.`,
          color: 'text-gray-500',
          bg: 'bg-gray-50',
        });
      }
    }

    // Savings Trend
    if (lastSavings > 0) {
      if (currentSavings > lastSavings) {
        items.push({
          icon: '💰',
          text: `Your savings grew by ${CURRENCY}${formattedAmount(currentSavings - lastSavings)} compared to last month!`,
          color: 'text-pest',
          bg: 'bg-teal-50',
        });
      } else if (currentSavings < lastSavings && currentSavings > 0) {
        items.push({
          icon: '⚠️',
          text: `Your savings are ${CURRENCY}${formattedAmount(lastSavings - currentSavings)} lower than last month.`,
          color: 'text-yellow-600',
          bg: 'bg-yellow-50',
        });
      }
    }

    // Highest spending month
    const maxExpense = Math.max(...expenses);
    if (maxExpense > 0) {
      const maxIdx = expenses.indexOf(maxExpense);
      items.push({
        icon: '👑',
        text: `${yearlySummery.months[maxIdx]} is your highest spending month this year (${CURRENCY}${formattedAmount(maxExpense)}).`,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
      });
    }

    return items;
  }, [yearlySummery]);

  if (!insights.length) return null;

  return (
    <div className="w-full rounded-2xl border bg-white p-4 shadow-lg md:p-6">
      <div className="mb-4 flex w-full items-center">
        <h3 className="text-base font-semibold text-pGray md:text-lg">Financial Insights</h3>
        <button
          className="ml-2 flex flex-none animate-pulse items-center justify-center rounded-full border border-pest px-1.5 py-0 text-xs font-semibold text-pest"
          onClick={() => setTipsModalOpen(true)}
        >
          i
        </button>
      </div>
      <div className="flex flex-col gap-y-2 md:gap-y-3">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-x-2 rounded-xl px-2 py-1.5 md:gap-x-3 md:p-3 ${item.bg}`}
          >
            <span className="text-base md:text-xl">{item.icon}</span>
            <p className={`text-xs font-medium md:text-sm ${item.color}`}>{item.text}</p>
          </div>
        ))}
      </div>
      {tipsModalOpen && (
        <TipsModal
          modalOpen={tipsModalOpen}
          setModalOpen={setTipsModalOpen}
          manual={EXPENSE_INSIGHTS_MANUALS}
        />
      )}
    </div>
  );
};

export default ExpenseInsights;
