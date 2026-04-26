'use client';

import React, { useContext, useMemo, useState } from 'react';
import { DataContext } from '@/context/DataContext';
import TipsModal from '@/components/modals/TipsModal';
import { BUDGET_OVERVIEW_MANUALS, CURRENCY } from '@/assets/constants';
import { formattedAmount } from '@/helpers/frontend/getSum';

const BudgetProgress = ({ categoryName, spent, budget, className = '' }) => {
  const percentage = Math.min((spent / budget) * 100, 100).toFixed(1);
  const isExceeded = spent > budget;

  let colorClass = 'bg-pest';
  if (percentage >= 80 && percentage < 100) colorClass = 'bg-yellow-500';
  if (percentage >= 100 || isExceeded) colorClass = 'bg-pRed';

  return (
    <div className={`rounded-2xl border border-finance-border bg-white/80 p-4 ${className}`}>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-sm font-bold capitalize text-finance-ink md:text-base">{categoryName}</span>
        <span className="text-sm font-semibold text-finance-muted md:text-base">
          {CURRENCY}
          {formattedAmount(spent)} / {CURRENCY}
          {formattedAmount(budget)}
        </span>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-finance-panel">
        <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
      {isExceeded && (
        <p className="mt-1 text-xs text-pRed">
          Exceeded budget by {CURRENCY}
          {formattedAmount(spent - budget)}
        </p>
      )}
    </div>
  );
};

const BudgetOverview = () => {
  const { expenseCategory, expenseData, expenseCategoryLoading, expenseLoading } = useContext(DataContext);
  const [tipsModalOpen, setTipsModalOpen] = useState(false);

  const budgetItems = useMemo(() => {
    if (!expenseCategory.length) return [];

    // Create a map of spends per category ID
    const spends = {};
    expenseData.forEach((expense) => {
      spends[expense.expense_category_id] =
        (spends[expense.expense_category_id] || 0) + parseFloat(expense.amount || 0);
    });

    // Filter categories that have a budget defined
    const items = expenseCategory
      .filter((cat) => cat.budget && parseFloat(cat.budget) > 0)
      .map((cat) => ({
        id: cat.expense_category_id,
        name: cat.name,
        budget: parseFloat(cat.budget),
        spent: spends[cat.expense_category_id] || 0,
      }));

    // Sort by highest percentage spent
    return items.sort((a, b) => b.spent / b.budget - a.spent / a.budget);
  }, [expenseCategory, expenseData]);

  if (expenseCategoryLoading || expenseLoading) return null;
  if (!budgetItems.length || !budgetItems.some((item) => item.spent)) return null;

  return (
    <div className="app-surface w-full rounded-3xl p-5">
      <div className="mb-5 flex w-full items-center">
        <div>
          <h3 className="text-lg font-black text-finance-ink">Monthly Budgets</h3>
          <p className="text-xs font-medium text-finance-muted">Category spending against planned limits</p>
        </div>
        <button
          className="bg-pest/8 ml-2 flex flex-none items-center justify-center rounded-full border border-pest/30 px-1.5 py-0 text-xs font-semibold text-pest"
          onClick={() => setTipsModalOpen(true)}
        >
          i
        </button>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
        {budgetItems.map((item) => (
          <BudgetProgress
            key={item.id}
            categoryName={item.name}
            spent={item.spent}
            budget={item.budget}
            className={`${item.spent ? '' : 'hidden md:block'}`}
          />
        ))}
      </div>
      {tipsModalOpen && (
        <TipsModal
          modalOpen={tipsModalOpen}
          setModalOpen={setTipsModalOpen}
          manual={BUDGET_OVERVIEW_MANUALS}
        />
      )}
    </div>
  );
};

export default BudgetOverview;
