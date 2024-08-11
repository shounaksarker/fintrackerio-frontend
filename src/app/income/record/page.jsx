'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CustomTable from '@/components/fields/Table';
import { formattedAmount, getIndividualSum, getSum } from '@/helpers/frontend/getSum';
import Button from '@/components/fields/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { INCOME_RECORDS_TABLE_HEADER, CURRENCY } from '@/assets/constants';
import InsertIncomeModal from '@/components/modals/InsertIncomeModal';
import TerminalsModal from '@/components/modals/TerminalsModal';
import CreateTerminalModal from '@/components/modals/CreateTerminalModal';
import TransferModal from '@/components/modals/TransferModal';
import {
  GET_TERMINALS_URL,
  TERMINAL_CREATE_URL,
  CREATE_INCOME_RECORD_URL,
  INCOME_BALANCE_TRANSFER_URL,
} from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import { CREATE_INCOME_DETAILS_VALUE, TRANSFER_VALUE } from '@/assets/constants/stateValue';
import { DataContext } from '@/context/DataContext';
import TransectionIcon from '@/assets/svg/Icon/TransectionIcon';

const Page = () => {
  const [addIncomeModal, setAddIncomeModal] = useState(false);
  const [addIncomeDetails, setAddIncomeDetails] = useState(CREATE_INCOME_DETAILS_VALUE);
  const [addIncomeLoading, setAddIncomeLoading] = useState(false);

  const {
    dateRange,
    endDate,
    fetchForce,
    balance,
    incomeData,
    incomeLoading,
    setIncomeLoading,
    fetchIncomeRecord,
    incomeSources,
    fetchIncomeSource,
    distributedIn,
    fetchDistributedIn,
    fetchBalance,
  } = useContext(DataContext);

  // show terminals
  const [allTerminals, setAllTerminals] = useState([]);
  const [allTerminalsModal, setTerminalModal] = useState(false);
  const [terminalsLoading, setTerminalsLoading] = useState(false);

  // transfer modal
  const [transferModal, setTransferModal] = useState(false);
  const [transferDetails, setTransferDetails] = useState(TRANSFER_VALUE);
  const [transferLoading, setTransferLoading] = useState(false);

  // create terminal
  const [terminalName, setTerminalName] = useState('');
  const [createTerminalModal, setCreateTerminalModal] = useState(false);
  const [ctLoading, setCtLoading] = useState(false);

  const fetchTerminal = async (force = false) => {
    if (!allTerminals.length || force) {
      try {
        setTerminalsLoading(true);
        const res = await axios.get(GET_TERMINALS_URL);

        if (res.data.success) {
          setAllTerminals(res.data.data);
        } else {
          notification(res.data.msg || 'Failed to load Terminals', { type: 'error', id: 'terminalsError' });
        }
        setIncomeLoading(false);
        setTerminalsLoading(false);
      } catch (err) {
        return err;
      }
    }
  };

  const fetchSource = () => {
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

  const fetchBalanceRecord = (force = false) => {
    if (!Object.keys(balance).length || fetchForce || endDate || force) {
      fetchBalance();
    }
  };

  const createIncome = async (e) => {
    e.preventDefault();
    setAddIncomeLoading(true);
    const res = await axios.post(CREATE_INCOME_RECORD_URL, addIncomeDetails);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createTerminal' });
      fetchIncomeRecord();
      fetchDistributedIn();
      setAddIncomeDetails(CREATE_INCOME_DETAILS_VALUE);
      fetchBalanceRecord(true);
      setAddIncomeModal(false);
    } else {
      notification(res.data.msg || 'Failed to create Income Record.', { type: 'error', id: 'createIncome' });
    }
    setAddIncomeLoading(false);
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

  useEffect(() => {
    if (!incomeData.length || fetchForce || endDate) {
      fetchIncomeRecord();
    }
    if (!distributedIn.length || fetchForce || endDate) {
      fetchDistributedIn();
    }
  }, [dateRange]);

  return (
    <div>
      <div className="mt-6">
        <div className="custom-border flex flex-wrap justify-end gap-x-3 rounded-sm p-2 shadow-sm">
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
          <Button size="small" onClick={() => setCreateTerminalModal(true)}>
            Create Terminal
          </Button>
          <Button
            size="small"
            onClick={() => {
              fetchTerminal();
              setTerminalModal(true);
            }}
          >
            Show Terminals
          </Button>
          <Button
            size="small"
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

        <h3 className="my-6 text-center text-2xl font-bold text-pGray underline underline-offset-4">
          Income Records
        </h3>
        <CustomTable
          headers={INCOME_RECORDS_TABLE_HEADER}
          data={incomeData}
          loading={incomeLoading}
          enablePagination
          dataPerPage={10}
          className={'w-full'}
          tableClass={'rounded-md p-4 shadow-md'}
          inputClass=""
          headerClass=""
          rowClass=""
        />
      </div>
      {incomeData.length > 0 && (
        <div className="flex flex-col items-start justify-start md:mx-auto md:mt-6 md:max-w-72">
          <div className="w-full rounded-md border border-phGray py-4 shadow-md">
            <h4 className="mx-auto mb-4 w-48 rounded-md bg-sBlack py-2 text-center text-white">
              Total - {CURRENCY} {formattedAmount(getSum(incomeData, 'amount') || balance.total_income)}
            </h4>
            <h5 className="mb-4 text-center text-lg font-semibold text-pGray underline">
              Income Distributed in
            </h5>
            <div>
              <div className="flex border-y py-1 text-center font-semibold">
                <h4 className="w-1/2">Terminal</h4>
                <h4 className="w-1/2">Amount</h4>
              </div>
              {Object.entries(getIndividualSum(distributedIn)).map(([terminal, total], i) => (
                <div key={i} className="flex w-full border-b py-1 text-sm capitalize text-gray-600">
                  <div className="w-1/2 text-center">{terminal}</div>
                  <div className="w-1/2 text-center">{formattedAmount(total)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <InsertIncomeModal
        modalOpen={addIncomeModal}
        setModalOpen={setAddIncomeModal}
        loading={addIncomeLoading}
        addIncome={addIncomeDetails}
        setAddIncomeDetails={setAddIncomeDetails}
        incomeSources={incomeSources}
        handleSubmit={createIncome}
      />
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
        loading={terminalsLoading}
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
