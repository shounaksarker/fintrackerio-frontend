'use client';

import React, { useContext, useEffect, useState } from 'react';
import { CURRENCY } from '@/assets/constants';
import { BALANCE_MODAL_VALUE } from '@/assets/constants/stateValue';
import BalanceModal from '../modals/balanceModal';
import { DataContext } from '@/context/DataContext';
import 'react-datepicker/dist/react-datepicker.css';
import { formattedAmount } from '@/helpers/frontend/getSum';

const BalanceDetails = () => {
  const { fetchForce, endDate, dateRange, balance, fetchBalance, balanceLoading } = useContext(DataContext);
  const [balanceModalData, setBalanceModalData] = useState(BALANCE_MODAL_VALUE);
  const [balanceModal, setBalanceModal] = useState(false);

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
      <div className="flex flex-col gap-y-3 md:flex-row md:justify-between md:gap-y-0">
        <button
          onClick={() => handleBalanceModal('Income')}
          className="flex w-full items-center justify-center rounded-sm bg-pest/30 p-3 shadow-[0_3px_2px_1px_rgba(0,0,0,0.4)] transition duration-200 ease-in-out hover:bg-pest/50 md:w-[32%]"
        >
          Income : &nbsp;
          <span>
            {CURRENCY} {balance.total_income ? formattedAmount(balance.total_income) : 0}
          </span>
        </button>
        <button
          onClick={() => handleBalanceModal('Expense')}
          className="flex w-full items-center justify-center rounded-sm bg-blue-800/30 p-3 shadow-[0_3px_2px_1px_rgba(0,0,0,0.4)] transition duration-200 ease-in-out hover:bg-blue-800/50 md:w-[32%]"
        >
          Expense : &nbsp;
          <span>
            {CURRENCY} {balance.total_expense ? formattedAmount(balance.total_expense) : 0}
          </span>
        </button>
        <button
          onClick={() => handleBalanceModal('Remain')}
          className="flex w-full items-center justify-center rounded bg-red-800/30 p-3 shadow-[0_3px_2px_1px_rgba(0,0,0,0.4)] transition duration-200 ease-in-out hover:bg-red-800/50 md:w-[32%]"
        >
          Remain : &nbsp;
          <span>
            {CURRENCY} {balance.remain ? formattedAmount(balance.remain) : 0}
          </span>
        </button>
      </div>

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
