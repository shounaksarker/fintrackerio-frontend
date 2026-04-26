'use client';

import React, { useContext, useMemo, useEffect, useState } from 'react';
import { DataContext } from '@/context/DataContext';
import TipsModal from '@/components/modals/TipsModal';
import { HEALTH_SCORE_MANUALS } from '@/assets/constants';

const FinancialHealthScore = () => {
  const { balance, balanceLoading, expenseCategory, expenseData, fetchExpenseCategory } =
    useContext(DataContext);
  const [tipsModalOpen, setTipsModalOpen] = useState(false);

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

  const radiusLg = 50;
  const circumference = 2 * Math.PI * radiusLg;
  const strokeDashoffset = circumference - (scoreData.score / 100) * circumference;

  return (
    <div className="app-surface relative flex w-full flex-col items-center overflow-hidden rounded-3xl p-5 md:p-6">
      {/* Decorative background blur */}
      <div
        className={`absolute right-0 top-0 size-32 bg-gradient-to-br ${scoreData.gradient} rounded-full opacity-10 blur-3xl`}
      />

      <div className="mb-4 flex w-full items-center md:mb-6">
        <div>
          <h3 className="text-left text-lg font-black text-finance-ink">Financial Health Score</h3>
          <p className="text-xs font-medium text-finance-muted">Savings rate and budget discipline</p>
        </div>
        <button
          className="bg-pest/8 ml-2 flex flex-none items-center justify-center rounded-full border border-pest/30 px-1.5 py-0 text-xs font-semibold text-pest"
          onClick={() => setTipsModalOpen(true)}
        >
          i
        </button>
      </div>

      <div className="flex w-full flex-row items-center gap-4 md:gap-8">
        {/* Animated Circular Progress */}
        <div className="relative flex size-28 items-center justify-center md:size-36">
          <svg className="size-28 -rotate-90 md:size-36">
            <circle
              cx="50%"
              cy="50%"
              r={radiusLg}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-finance-panel"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radiusLg}
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
            <span className={`text-3xl font-extrabold md:text-4xl ${scoreData.color}`}>
              {scoreData.score}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 md:text-xs">
              {scoreData.status}
            </span>
          </div>
        </div>

        {/* Dynamic Messages */}
        <div className="flex flex-1 flex-col gap-y-2 md:gap-y-3">
          {scoreData.messages.map((msg, idx) => (
            <div
              key={idx}
              className="flex items-center gap-x-2 rounded-xl border border-finance-border bg-white/80 px-2 py-1.5 text-xs font-medium text-finance-muted md:p-2 md:text-sm"
            >
              <span>{msg}</span>
            </div>
          ))}
        </div>
      </div>
      {tipsModalOpen && (
        <TipsModal modalOpen={tipsModalOpen} setModalOpen={setTipsModalOpen} manual={HEALTH_SCORE_MANUALS} />
      )}
    </div>
  );
};

export default FinancialHealthScore;
