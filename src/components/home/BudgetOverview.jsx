'use client';

import React, { useContext, useMemo } from 'react';
import { DataContext } from '@/context/DataContext';
import { CURRENCY } from '@/assets/constants';
import { formattedAmount } from '@/helpers/frontend/getSum';

const BudgetProgress = ({ categoryName, spent, budget }) => {
  const percentage = Math.min((spent / budget) * 100, 100).toFixed(1);
  const isExceeded = spent > budget;

  let colorClass = 'bg-pest';
  if (percentage >= 80 && percentage < 100) colorClass = 'bg-yellow-500';
  if (percentage >= 100 || isExceeded) colorClass = 'bg-pRed';

  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium capitalize text-pGray">{categoryName}</span>
        <span className="text-gray-500">
          {CURRENCY}
          {formattedAmount(spent)} / {CURRENCY}
          {formattedAmount(budget)}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-200">
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
  if (!budgetItems.length) return null;

  return (
    <div className="w-full rounded-md border bg-white p-4 shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-pGray">Monthly Budgets</h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
        {budgetItems.map((item) => (
          <BudgetProgress key={item.id} categoryName={item.name} spent={item.spent} budget={item.budget} />
        ))}
      </div>
    </div>
  );
};

export default BudgetOverview;
