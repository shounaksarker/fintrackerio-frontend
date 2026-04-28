'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CustomTable from '@/components/fields/Table';
import { formattedAmount, getIndividualSum, getSum } from '@/helpers/frontend/getSum';
import Button from '@/components/fields/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { INCOME_RECORDS_TABLE_HEADER, CURRENCY, RECURRING_INTERVAL } from '@/assets/constants';
import IncomeModal from '@/components/modals/IncomeModal';
import TerminalsModal from '@/components/modals/TerminalsModal';
import CreateTerminalModal from '@/components/modals/CreateTerminalModal';
import TransferModal from '@/components/modals/TransferModal';
import {
  TERMINAL_CREATE_URL,
  CREATE_INCOME_RECORD_URL,
  EDIT_INCOME_RECORD_URL,
  INCOME_BALANCE_TRANSFER_URL,
  CREATE_RECURRING_URL,
} from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import { CREATE_INCOME_DETAILS_VALUE, TRANSFER_VALUE } from '@/assets/constants/stateValue';
import { DataContext } from '@/context/DataContext';
import TransectionIcon from '@/assets/svg/Icon/TransectionIcon';
import EditIcon from '@/assets/svg/Icon/EditIcon';

const Page = () => {
  const [addIncomeModal, setAddIncomeModal] = useState(false);
  const [addIncomeDetails, setAddIncomeDetails] = useState(CREATE_INCOME_DETAILS_VALUE);
  const [incomeDetailsLoading, setIncomeDetailsLoading] = useState(false);
  // edit income record
  const [editIncomeDetails, setEditIncomeDetails] = useState();
  const [editIncomeModal, setEditIncomeModal] = useState(false);

  const {
    dateRange,
    endDate,
    fetchForce,
    balance,
    incomeData,
    incomeLoading,
    fetchIncomeRecord,
    incomeSources,
    fetchIncomeSource,
    distributedIn,
    fetchDistributedIn,
    fetchBalance,
    fetchTerminal,
    allTerminals,
    allTerminalsLoading,
    fetchRecurringData,
  } = useContext(DataContext);

  // show terminals
  const [allTerminalsModal, setTerminalModal] = useState(false);

  // transfer modal
  const [transferModal, setTransferModal] = useState(false);
  const [transferDetails, setTransferDetails] = useState(TRANSFER_VALUE);
  const [transferLoading, setTransferLoading] = useState(false);

  // create terminal
  const [terminalName, setTerminalName] = useState('');
  const [createTerminalModal, setCreateTerminalModal] = useState(false);
  const [ctLoading, setCtLoading] = useState(false);

  const fetchSource = async () => {
    if (!incomeSources.length) {
      fetchIncomeSource();
    }
  };

  const createTerminal = async (e) => {
    e.preventDefault();
    setCtLoading(true);
    const res = await axios.post(TERMINAL_CREATE_URL, { terminal_name: terminalName });
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createTerminal' });
      setTerminalName('');
      setCreateTerminalModal(false);
      fetchTerminal('force');
      fetchBalance();
    } else {
      notification(res.data.msg || 'Failed to create new terminal.', { type: 'error', id: 'createTerminal' });
    }
    setCtLoading(false);
  };

  const fetchBalanceRecord = async (force = false) => {
    if (!Object.keys(balance).length || fetchForce || endDate || force) {
      fetchBalance();
    }
  };

  const createIncome = async (e) => {
    e.preventDefault();
    setIncomeDetailsLoading(true);
    const res = await axios.post(CREATE_INCOME_RECORD_URL, addIncomeDetails);
    if (res.data.success) {
      if (addIncomeDetails.is_recurring) {
        const nextDate = new Date(addIncomeDetails.date);
        if (addIncomeDetails.recurrence_interval === RECURRING_INTERVAL.WEEKLY)
          nextDate.setDate(nextDate.getDate() + 7);
        else if (addIncomeDetails.recurrence_interval === RECURRING_INTERVAL.MONTHLY)
          nextDate.setMonth(nextDate.getMonth() + 1);
        else if (addIncomeDetails.recurrence_interval === RECURRING_INTERVAL.YEARLY)
          nextDate.setFullYear(nextDate.getFullYear() + 1);

        await axios.post(CREATE_RECURRING_URL, {
          type: 'income',
          category_id: addIncomeDetails.income_category_id,
          amount: addIncomeDetails.amount,
          description: addIncomeDetails.description,
          recurrence_interval: addIncomeDetails.recurrence_interval,
          next_execution_date: nextDate,
        });
      }

      notification(res.data.msg, { type: 'success', id: 'createTerminal' });
      fetchIncomeRecord();
      fetchDistributedIn();
      setAddIncomeDetails(CREATE_INCOME_DETAILS_VALUE);
      await fetchBalanceRecord(true);
      setAddIncomeModal(false);
      if (addIncomeDetails.is_recurring) {
        fetchRecurringData();
      }
    } else {
      notification(res.data.msg || 'Failed to create Income Record.', { type: 'error', id: 'createIncome' });
    }
    setIncomeDetailsLoading(false);
  };

  const balanceTransfer = async () => {
    setTransferLoading(true);
    const res = await axios.post(INCOME_BALANCE_TRANSFER_URL, transferDetails);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'balanceTransfer' });
      setTransferDetails(TRANSFER_VALUE);
      fetchDistributedIn();
      fetchBalance();
      setTransferModal(false);
    } else {
      notification(res.data.msg || 'Failed to create Income Record.', { type: 'error', id: 'createIncome' });
    }
    setTransferLoading(false);
  };

  // <-------- Income Edit functions --------->
  const handleIncomeEdit = async (info) => {
    await fetchSource();

    const updatedInfo = {
      record_id: info.record_id,
      income_category_id: info.income_category_id,
      amount: info.amount, // new amount
      previousAmount: info.amount, // previous amount
      date: info.date,
      description: info.description,
    };

    setEditIncomeDetails(updatedInfo);
    setEditIncomeModal(true);
  };

  const submitEditIncome = async (e) => {
    e.preventDefault();
    setIncomeDetailsLoading(true);
    const payload = {
      income_record_id: editIncomeDetails.record_id,
      income_category_id: editIncomeDetails.income_category_id,
      amount: editIncomeDetails.previousAmount, // previous amount
      newAmount: editIncomeDetails.amount, // new amount
      date: editIncomeDetails.date,
      description: editIncomeDetails.description,
    };

    const res = await axios.put(EDIT_INCOME_RECORD_URL, payload);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'editIncome' });
      fetchIncomeRecord();
      fetchDistributedIn();
      await fetchBalanceRecord(true);
      setEditIncomeDetails();
      setEditIncomeModal(false);
    } else {
      notification(res.data.msg || 'Failed to edit Income Record.', { type: 'error', id: 'editIncome' });
    }
    setIncomeDetailsLoading(false);
  };

  const expenseRecordHeader = [
    {
      label: 'Action',
      style: 'w-20 md:!w-full h-6 text-sm lg:text-md',
      target: 'action',
      action: [
        { label: <EditIcon className={`h-5`} />, onClick: (row) => handleIncomeEdit(row) },
        // { label: <DeleteIcon className={`h-5`} />, onClick: (row) => handleDelete(row) },
      ],
    },
  ];

  useEffect(() => {
    if (!incomeData.length || fetchForce || endDate) {
      fetchIncomeRecord();
    }
    if (!distributedIn.length || fetchForce || endDate) {
      fetchDistributedIn();
    }
  }, [dateRange]);

  return (
    <div className="page-shell">
      <div>
        <div className="page-toolbar">
          <div>
            <h1 className="page-title">Income Records</h1>
            <p className="page-subtitle">Add income, manage wallet, and move balances.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="small"
              iconLeft={'+'}
              onClick={() => {
                setAddIncomeModal(true);
                fetchSource();
              }}
            >
              Add Income
            </Button>
            <Button size="small" color="secondary" onClick={() => setCreateTerminalModal(true)}>
              Create Wallet
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                fetchTerminal();
                setTerminalModal(true);
              }}
            >
              Show Wallets
            </Button>
            <Button
              size="small"
              color="secondary"
              iconLeft={<TransectionIcon />}
              onClick={() => {
                fetchTerminal();
                fetchBalanceRecord();
                setTransferModal(true);
              }}
            >
              Balance Transfer
            </Button>
          </div>
        </div>

        <CustomTable
          headers={INCOME_RECORDS_TABLE_HEADER(expenseRecordHeader)}
          data={incomeData}
          loading={incomeLoading}
          enablePagination
          className={'mt-4 w-full'}
          emptyTitle="No income records yet"
          emptyDescription="Add income for this date range to track earnings and update wallet balances."
        />
      </div>
      {incomeData.length > 0 && (
        <div className="flex flex-col items-start justify-start md:mx-auto md:max-w-80">
          <div className="app-surface w-full rounded-2xl p-4">
            <h4 className="summary-pill mx-auto mb-4 w-full">
              Total - {CURRENCY} {formattedAmount(getSum(incomeData, 'amount') || balance.total_income)}
            </h4>
            <h5 className="mb-4 text-center text-lg font-black text-finance-ink">Income Distributed In</h5>
            <div>
              <div className="flex border-y border-finance-border py-2 text-center text-sm font-bold text-finance-muted">
                <h4 className="w-1/2">Wallet</h4>
                <h4 className="w-1/2">Amount</h4>
              </div>
              {Object.entries(getIndividualSum(distributedIn)).map(([terminal, total], i) => (
                <div
                  key={i}
                  className="flex w-full border-b border-finance-border py-2 text-sm capitalize text-finance-ink"
                >
                  <div className="w-1/2 text-center">{terminal}</div>
                  <div className="w-1/2 text-center">{formattedAmount(total)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {addIncomeModal && (
        <IncomeModal
          modalOpen={addIncomeModal}
          setModalOpen={setAddIncomeModal}
          loading={incomeDetailsLoading}
          data={addIncomeDetails}
          setData={setAddIncomeDetails}
          incomeSources={incomeSources}
          handleSubmit={createIncome}
        />
      )}
      {editIncomeModal && (
        <IncomeModal
          modalOpen={editIncomeModal}
          setModalOpen={setEditIncomeModal}
          loading={incomeDetailsLoading}
          data={editIncomeDetails}
          setData={setEditIncomeDetails}
          incomeSources={incomeSources}
          handleSubmit={submitEditIncome}
        />
      )}
      <TransferModal
        modalOpen={transferModal}
        setModalOpen={setTransferModal}
        loading={transferLoading}
        setLoading={setTransferLoading}
        transfer={transferDetails}
        setTransfer={setTransferDetails}
        allTerminals={allTerminals}
        handleSubmit={balanceTransfer}
        terminalBalances={balance.terminal}
      />
      <TerminalsModal
        modalOpen={allTerminalsModal}
        setModalOpen={setTerminalModal}
        allTerminals={allTerminals}
        fetchTerminal={fetchTerminal}
        fetchDistributedIn={fetchDistributedIn}
        loading={allTerminalsLoading}
      />
      <CreateTerminalModal
        modalOpen={createTerminalModal}
        setModalOpen={setCreateTerminalModal}
        loading={ctLoading}
        terminalName={terminalName}
        setTerminalName={setTerminalName}
        handleSubmit={createTerminal}
      />
    </div>
  );
};

export default Page;
