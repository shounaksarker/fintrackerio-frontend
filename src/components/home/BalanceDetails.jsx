'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import { BALANCE_TITLE, CURRENCY } from '@/assets/constants';
import { BALANCE_MODAL_VALUE } from '@/assets/constants/stateValue';
import BalanceModal from '../modals/balanceModal';
import { DataContext } from '@/context/DataContext';
import 'react-datepicker/dist/react-datepicker.css';
import { formattedAmount } from '@/helpers/frontend/getSum';

const MetricCard = ({ title, value, tone, onClick }) => {
  const toneClass = {
    income: {
      card: 'border-pest/15 from-pest/10 via-white to-finance-teal/10 hover:border-pest/30',
      chip: 'border-pest/25 bg-white/90 text-pest shadow-sm ring-1 ring-pest/10',
    },
    expense: {
      card: 'border-pRed/15 from-pRed/10 via-white to-finance-orange/10 hover:border-pRed/30',
      chip: 'border-pRed/25 bg-white/90 text-pRed shadow-sm ring-1 ring-pRed/10',
    },
    remain: {
      card: 'border-finance-accent/15 from-finance-accent/10 via-white to-pest/10 hover:border-finance-accent/30',
      chip: 'border-finance-accent/25 bg-white/90 text-finance-accent shadow-sm ring-1 ring-finance-accent/10',
    },
  };
  const currentTone = toneClass[tone] || toneClass.remain;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full flex-col items-start justify-between rounded-2xl border bg-gradient-to-br px-3 py-2.5 text-left shadow-soft transition-colors duration-300 hover:shadow-card focus-visible:ring-2 focus-visible:ring-pest/25 md:px-3.5 md:py-3 ${currentTone.card}`}
    >
      <div
        className={`rounded-xl border px-1.5 py-0.5 text-xs font-bold tracking-wide md:text-sm ${currentTone.chip}`}
      >
        {title}
      </div>
      <div>
        <div className="text-md mt-1.5 font-black tracking-tight text-finance-ink sm:text-lg sm:text-xl md:mt-2 md:text-[22px]">
          {CURRENCY}
          {formattedAmount(value || 0)}
        </div>
        {/* <p className="text-finance-muted mt-1 text-xs font-medium">{caption}</p> */}
      </div>
    </button>
  );
};

const WalletRow = ({ terminal }) => {
  const balance = Number(terminal.balance || 0);
  const isPositive = balance >= 0;

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-finance-border bg-white/80 p-2.5 transition-colors hover:bg-white md:gap-3 md:p-3">
      <div className="flex min-w-0 items-center gap-2 md:gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gray-950 text-[11px] font-black uppercase text-white md:size-10 md:text-xs">
          {terminal.terminal_name?.slice(0, 2) || 'FT'}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-bold capitalize text-finance-ink">
            {terminal.terminal_name}
          </div>
          <div className="truncate text-[11px] text-finance-muted md:text-xs">
            In {CURRENCY}
            {formattedAmount(terminal.total_in || 0)} / Out {CURRENCY}
            {formattedAmount(terminal.total_out || 0)}
          </div>
        </div>
      </div>
      <div
        className={`shrink-0 text-right text-xs font-black md:text-sm ${isPositive ? 'text-pest' : 'text-pRed'}`}
      >
        {CURRENCY}
        {formattedAmount(balance)}
      </div>
    </div>
  );
};

const BalanceDetails = () => {
  const { fetchForce, endDate, dateRange, balance, fetchBalance, balanceLoading } = useContext(DataContext);
  const [balanceModalData, setBalanceModalData] = useState(BALANCE_MODAL_VALUE);
  const [balanceModal, setBalanceModal] = useState(false);

  const terminals = useMemo(() => balance.terminal || [], [balance.terminal]);
  const totalIncome = Number(balance.total_income || 0);
  const totalExpense = Number(balance.total_expense || 0);
  const remain = Number(balance.remain || 0);
  const savingsRate = totalIncome ? Math.max((remain / totalIncome) * 100, 0).toFixed(1) : '0.0';

  const handleBalanceModal = (title) => {
    setBalanceModalData({
      title,
      balance,
    });
    setBalanceModal(true);
  };

  useEffect(() => {
    if (fetchForce || endDate || !Object.keys(balance).length) {
      fetchBalance();
    }
  }, [dateRange]);

  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-gray-950 p-4 text-white shadow-card md:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.32),transparent_34rem),radial-gradient(circle_at_88%_24%,rgba(20,184,166,0.24),transparent_24rem)]" />
          <div className="relative">
            <div className="flex justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Monthly balance</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight md:mt-3 md:text-5xl">
                  {CURRENCY}
                  {balanceLoading ? '...' : formattedAmount(remain)}
                </h2>
                <p className="mt-1.5 max-w-md text-xs leading-5 text-white/55 md:mt-2 md:text-sm">
                  Current remaining balance after income and expenses for the selected period.
                </p>
              </div>
              <div className="w-fit rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-left sm:h-fit md:px-4 md:py-3 md:text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Savings rate</p>
                <p className="mt-0.5 text-xl font-black text-finance-teal md:mt-1 md:text-2xl">
                  {savingsRate}%
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 md:mt-6">
              <MetricCard
                title={BALANCE_TITLE.INCOME}
                value={totalIncome}
                // caption="Tap for terminal details"
                tone="income"
                onClick={() => handleBalanceModal(BALANCE_TITLE.INCOME)}
              />
              <MetricCard
                title={BALANCE_TITLE.EXPENSE}
                value={totalExpense}
                // caption="Tap for terminal details"
                tone="expense"
                onClick={() => handleBalanceModal(BALANCE_TITLE.EXPENSE)}
              />
              <MetricCard
                title={BALANCE_TITLE.REMAIN}
                value={remain}
                // caption="Tap for terminal details"
                tone="remain"
                onClick={() => handleBalanceModal(BALANCE_TITLE.REMAIN)}
              />
            </div>
          </div>
        </div>

        <aside className="app-surface rounded-3xl p-4 md:p-5">
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <div>
              <h3 className="text-lg font-black text-finance-ink">Wallets</h3>
              <p className="text-xs font-medium text-finance-muted">Terminal balances</p>
            </div>
            <span className="rounded-full bg-pest/10 px-3 py-1 text-xs font-bold text-pest">
              {terminals.length} active
            </span>
          </div>
          <div className="scrollbar-thin flex max-h-[178px] flex-col gap-2 overflow-y-auto pr-1 md:max-h-[220px] md:gap-3">
            {terminals.length ? (
              terminals.map((terminal) => <WalletRow key={terminal.terminal_id} terminal={terminal} />)
            ) : (
              <div className="rounded-2xl border border-dashed border-finance-border p-6 text-center text-sm font-medium text-finance-muted">
                No wallet balance yet.
              </div>
            )}
          </div>
        </aside>
      </section>

      <BalanceModal
        loading={balanceLoading}
        modalOpen={balanceModal}
        setModalOpen={setBalanceModal}
        data={balanceModalData}
      />
    </>
  );
};

export default BalanceDetails;
