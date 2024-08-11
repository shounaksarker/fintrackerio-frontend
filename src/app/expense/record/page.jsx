'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CustomTable from '@/components/fields/Table';
import { formattedAmount, getSum } from '@/helpers/frontend/getSum';
import Button from '@/components/fields/Button';
import 'react-datepicker/dist/react-datepicker.css';
import { CURRENCY, EXPENSE_RECORDS_TABLE_HEADER } from '@/assets/constants';
import InsertExpenseModal from '@/components/modals/InsertExpenseModal';
import { notification } from '@/components/notification';
import { CREATE_EXPENSE_RECORD_URL, GET_TERMINALS_URL } from '@/helpers/frontend/apiEndpoints';
import { DataContext } from '@/context/DataContext';
import { EXPENSE } from '@/assets/constants/stateValue';

const Page = () => {
  const {
    balance,
    expenseData,
    expenseLoading,
    setExpenseLoading,
    fetchExpenseRecord,
    fetchForce,
    endDate,
    dateRange,
    fetchBalance,
    fetchExpenseCategory,
    expenseCategory,
  } = useContext(DataContext);
  const [expenseDetails, setExpenseDetails] = useState(EXPENSE);
  const [insertExpenseModal, setInsertExpenseModal] = useState(false);
  const [createExpenseLoading, setCreateExpenseLoading] = useState(false);
  const [terminals, setTerminals] = useState([]);
  const [maxAmount, setMaxAmount] = useState(0);

  const fetchTerminal = async () => {
    if (!terminals.length) {
      try {
        const res = await axios.get(GET_TERMINALS_URL);
        if (res.data.success) {
          setTerminals(res.data.data);
        } else {
          notification(res.data.msg || 'Failed to load Terminals', { type: 'error', id: 'terminalsError' });
        }
      } catch (err) {
        return err;
      }
    }
  };
  const createExpense = async (e) => {
    e.preventDefault();
    setCreateExpenseLoading(true);
    const res = await axios.post(CREATE_EXPENSE_RECORD_URL, expenseDetails);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createTerminal' });
      setExpenseDetails(EXPENSE);
      setInsertExpenseModal(false);
      setMaxAmount(0);
      fetchExpenseRecord();
      fetchBalance();
    } else {
      notification(res.data.msg || 'Failed to create Expense Record.', {
        type: 'error',
        id: 'createExpense',
      });
    }
    setCreateExpenseLoading(false);
  };
  const fetchCategory = () => {
    if (!expenseCategory.length) {
      fetchExpenseCategory();
    }
  };

  const fetchBalanceRecord = () => {
    if (!Object.keys(balance).length || fetchForce || endDate) {
      fetchBalance();
    } else {
      setExpenseLoading(false);
    }
  };

  useEffect(() => {
    if (!expenseData.length || fetchForce || endDate) {
      fetchExpenseRecord();
    }
  }, [dateRange]);

  return (
    <div>
      <div>
        <div className="custom-borde flex flex-wrap justify-end gap-x-3 rounded-sm p-2 shadow-sm">
          <Button
            size="small"
            iconLeft={'+'}
            onClick={() => {
              fetchCategory();
              fetchTerminal();
              fetchBalanceRecord();
              setInsertExpenseModal(true);
            }}
          >
            Add Expense
          </Button>
        </div>

        <h3 className="my-6 text-center text-2xl font-bold text-pGray underline underline-offset-4">
          Expense Records
        </h3>
        <CustomTable
          headers={EXPENSE_RECORDS_TABLE_HEADER}
          data={expenseData}
          // enableSearch
          enablePagination
          dataPerPage={10}
          className={'w-full'}
          tableClass={'rounded-md p-4 shadow-md'}
          loading={expenseLoading}
        />
      </div>
      <h4 className="mx-auto my-4 w-48 rounded-md bg-sBlack py-2 text-center text-white">
        Total - {CURRENCY} {formattedAmount(balance.total_expense || getSum(expenseData, 'amount'))}
      </h4>
      <InsertExpenseModal
        modalOpen={insertExpenseModal}
        setModalOpen={setInsertExpenseModal}
        loading={createExpenseLoading}
        expense={expenseDetails}
        setExpense={setExpenseDetails}
        expenseCategories={expenseCategory}
        terminals={terminals}
        handleSubmit={createExpense}
        terminalBalances={balance.terminal}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
      />
    </div>
  );
};

export default Page;
