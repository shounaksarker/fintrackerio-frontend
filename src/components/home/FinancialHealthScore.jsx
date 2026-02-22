'use client';

import React, { useContext, useMemo, useEffect } from 'react';
import { DataContext } from '@/context/DataContext';

const FinancialHealthScore = () => {
  const { balance, balanceLoading, expenseCategory, expenseData, fetchExpenseCategory } =
    useContext(DataContext);

  const scoreData = useMemo(() => {
    if (balanceLoading || !Object.keys(balance).length) return null;

    let score = 0;
    const messages = [];

    const income = parseFloat(balance.total_income || 0);
    const expense = parseFloat(balance.total_expense || 0);
    const remain = parseFloat(balance.remain || 0);

    // 1. Savings Rate Score (Max 50 points)
    // Goal: Save 20%+ of income
    if (income > 0) {
      const savingsRate = remain / income;
      if (savingsRate >= 0.2) {
        score += 50;
        messages.push('🌟 Excellent savings rate (20%+)');
      } else if (savingsRate > 0) {
        const partial = (savingsRate / 0.2) * 50;
        score += partial;
        messages.push("📈 You're saving, but try to reach 20%");
      } else {
        messages.push('⚠️ You spent more than you earned');
      }
    } else {
      messages.push('⚠️ No income recorded yet');
    }

    // 2. Budget Adherence Score (Max 50 points)
    // Goal: Stay within allocated budgets
    let totalBudget = 0;
    let totalSpentInBudgets = 0;

    const spends = {};
    expenseData.forEach((exp) => {
      spends[exp.expense_category_id] = (spends[exp.expense_category_id] || 0) + parseFloat(exp.amount || 0);
    });

    expenseCategory.forEach((cat) => {
      if (cat.budget && parseFloat(cat.budget) > 0) {
        totalBudget += parseFloat(cat.budget);
        totalSpentInBudgets += spends[cat.expense_category_id] || 0;
      }
    });

    if (totalBudget > 0) {
      if (totalSpentInBudgets <= totalBudget) {
        score += 50;
        messages.push('🎯 Perfect budget adherence');
      } else {
        const overspentRatio = (totalSpentInBudgets - totalBudget) / totalBudget;
        const penalty = Math.min(overspentRatio * 50, 50); // Lose up to 50 points
        score += 50 - penalty;
        messages.push("📊 You've exceeded your monthly budgets");
      }
    } else {
      // If no budgets, give them 25 points so the score isn't artificially low
      score += 25;
      messages.push('💡 Set category budgets to improve your score');
    }

    // Add some randomness if no data is present just so it doesn't look broken
    if (income === 0 && expense === 0) {
      return {
        score: 0,
        messages: ['Add income and expenses to track your health'],
        color: 'text-gray-400',
        stroke: 'stroke-gray-300',
      };
    }

    score = Math.round(score);
    let color = 'text-pRed';
    let stroke = 'stroke-pRed';
    let gradient = 'from-red-500 to-rose-400';
    let status = 'Needs Work';

    if (score >= 80) {
      color = 'text-pest';
      stroke = 'stroke-pest';
      gradient = 'from-emerald-400 to-teal-500';
      status = 'Excellent';
    } else if (score >= 50) {
      color = 'text-yellow-500';
      stroke = 'stroke-yellow-400';
      gradient = 'from-amber-400 to-orange-400';
      status = 'Good';
    }

    return { score, color, stroke, gradient, status, messages };
  }, [balance, balanceLoading, expenseCategory, expenseData]);

  useEffect(() => {
    if (!expenseCategory.length) {
      fetchExpenseCategory();
    }
  }, []);

  if (!scoreData) return null;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreData.score / 100) * circumference;

  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-2xl border bg-white p-6 shadow-lg">
      {/* Decorative background blur */}
      <div
        className={`absolute right-0 top-0 size-32 bg-gradient-to-br ${scoreData.gradient} rounded-full opacity-10 blur-3xl`}
      />

      <h3 className="mb-6 w-full text-left text-lg font-bold text-pGray">Financial Health Score</h3>

      <div className="flex w-full flex-col items-center gap-8 md:flex-row">
        {/* Animated Circular Progress */}
        <div className="relative flex size-36 items-center justify-center">
          <svg className="size-36 -rotate-90 transform">
            <circle
              cx="72"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-100"
            />
            <circle
              cx="70"
              cy="72"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`${scoreData.stroke} transition-all duration-1000 ease-out`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className={`text-4xl font-extrabold ${scoreData.color}`}>{scoreData.score}</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {scoreData.status}
            </span>
          </div>
        </div>

        {/* Dynamic Messages */}
        <div className="flex flex-1 flex-col gap-y-3">
          {scoreData.messages.map((msg, idx) => (
            <div
              key={idx}
              className="flex items-center gap-x-2 rounded-lg bg-gray-50 p-2 text-sm text-gray-600"
            >
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;
