'use client';

import React, { useContext, useEffect, useState } from 'react';
import { CURRENCY } from '@/assets/constants';
import { BALANCE_MODAL_VALUE } from '@/assets/constants/stateValue';
import BalanceModal from '../modals/balanceModal';
import { DataContext } from '@/context/DataContext';
import 'react-datepicker/dist/react-datepicker.css';

const BalanceDetails = () => {
  const { fetchForce, endDate, dateRange, balance, fetchBalance, balanceLoading } = useContext(DataContext);
  const [balanceModalData, setBalanceModalData] = useState(BALANCE_MODAL_VALUE);
  const [balanceModal, setBalanceModal] = useState(false);

  const handleBalanceModal = (info) => {
    setBalanceModalData({
      title: info.title,
      balance,
      target_key: info.keyName,
      target_value: info.valueName,
      target_total: info.totalName,
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
          onClick={() =>
            handleBalanceModal({
              title: 'Income',
              keyName: 'terminal_name',
              valueName: 'total_in',
              totalName: 'total_income',
            })
          }
          className="flex w-full items-center justify-center rounded-sm bg-pest/30 p-3 shadow-[0_3px_2px_1px_rgba(0,0,0,0.4)] transition duration-200 ease-in-out hover:bg-pest/50 md:w-[32%]"
        >
          Income : &nbsp;
          <span>
            {CURRENCY} {balance.total_income ? Number(balance.total_income).toFixed(1) : 0}
          </span>
        </button>
        <button
          onClick={() =>
            handleBalanceModal({
              title: 'Expense',
              keyName: 'terminal_name',
              valueName: 'total_out',
              totalName: 'total_expense',
            })
          }
          className="flex w-full items-center justify-center rounded-sm bg-blue-800/30 p-3 shadow-[0_3px_2px_1px_rgba(0,0,0,0.4)] transition duration-200 ease-in-out hover:bg-blue-800/50 md:w-[32%]"
        >
          Expense : &nbsp;
          <span>
            {CURRENCY} {balance.total_expense ? Number(balance.total_expense).toFixed(1) : 0}
          </span>
        </button>
        <button
          onClick={() =>
            handleBalanceModal({
              title: 'Remain',
              keyName: 'terminal_name',
              valueName: 'balance',
              totalName: 'remain',
            })
          }
          className="flex w-full items-center justify-center rounded bg-red-800/30 p-3 shadow-[0_3px_2px_1px_rgba(0,0,0,0.4)] transition duration-200 ease-in-out hover:bg-red-800/50 md:w-[32%]"
        >
          Remain : &nbsp;
          <span>
            {CURRENCY} {balance.remain ? Number(balance.remain).toFixed(1) : 0}
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
