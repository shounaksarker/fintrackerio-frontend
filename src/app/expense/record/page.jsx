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
import { DataContext } from '@/context/DataContext';
import { EXPENSE } from '@/assets/constants/stateValue';
import EditIcon from '@/assets/svg/Icon/EditIcon';
import DeleteIcon from '@/assets/svg/Icon/DeleteIcon';
import {
  CREATE_EXPENSE_RECORD_URL,
  EDIT_EXPENSE_RECORD_URL,
  DELETE_EXPENSE_RECORD_URL,
} from '@/helpers/frontend/apiEndpoints';
import ConfirmModal from '@/components/modals/ConfirmModal';

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
    fetchTerminal,
    allTerminals,
  } = useContext(DataContext);
  const [expenseDetails, setExpenseDetails] = useState(EXPENSE);
  const [insertExpenseModal, setInsertExpenseModal] = useState(false);
  const [createExpenseLoading, setCreateExpenseLoading] = useState(false);
  const [maxAmount, setMaxAmount] = useState(0);
  const [maxEditeAmount, setMaxEditeAmount] = useState(0);
  const [editExpenseDetails, setEditExpenseDetails] = useState();
  const [editExpenseModal, setEditExpenseModal] = useState(false);
  const [editExpenseLoading, setEditExpenseLoading] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState(null);

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
  const fetchBalanceRecord = async () => {
    if (!Object.keys(balance).length || fetchForce || endDate) {
      await fetchBalance();
    } else {
      setExpenseLoading(false);
    }
  };

  // <-------- Expense Edit functions --------->
  const handleExpenseEdit = async (info) => {
    fetchCategory();
    await fetchTerminal();
    await fetchBalanceRecord();
    setEditExpenseDetails(info);
    setEditExpenseModal(true);
  };
  const submitEditExpense = async (e) => {
    e.preventDefault();
    setEditExpenseLoading(true);
    const res = await axios.put(EDIT_EXPENSE_RECORD_URL, editExpenseDetails);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'editExpense' });
      setEditExpenseDetails();
      setEditExpenseModal(false);
      setMaxEditeAmount(0);
      fetchExpenseRecord();
      fetchBalance();
    } else {
      notification(res.data.msg || 'Failed to edit Expense Record.', {
        type: 'error',
        id: 'editExpense',
      });
    }
    setEditExpenseLoading(false);
  };

  // <-------- Expense Delete functions --------->
  const handleDelete = (info) => {
    setDeleteExpenseId(info.record_id);
    setDeleteConfirmModal(true);
  };
  const confirmDelete = async (e) => {
    e.preventDefault();
    setDeleteConfirmLoading(true);
    const res = await axios.delete(`${DELETE_EXPENSE_RECORD_URL}?record_id=${deleteExpenseId}`);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'deleteExpense' });
      setDeleteExpenseId(null);
      setDeleteConfirmModal(false);
      fetchExpenseRecord();
      fetchBalance();
    } else {
      notification(res.data.msg || 'Failed to delete Expense Record.', {
        type: 'error',
        id: 'deleteExpense',
      });
    }
    setDeleteConfirmLoading(false);
  };

  const expenseRecordHeader = [
    {
      label: 'Action',
      style: 'w-[90px] h-6 text-sm lg:text-md',
      target: 'action',
      action: [
        { label: <EditIcon className={`h-5`} />, onClick: (row) => handleExpenseEdit(row) },
        { label: <DeleteIcon className={`h-5`} />, onClick: (row) => handleDelete(row) },
      ],
    },
  ];

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
          headers={EXPENSE_RECORDS_TABLE_HEADER(expenseRecordHeader)}
          data={expenseData}
          enableSearch
          enablePagination
          className={'w-full'}
          tableClass={'rounded-md p-4 shadow-md'}
          loading={expenseLoading}
        />
      </div>
      <h4 className="mx-auto my-4 w-48 rounded-md bg-sBlack py-2 text-center text-white">
        Total - {CURRENCY} {formattedAmount(balance.total_expense || getSum(expenseData, 'amount'))}
      </h4>
      <InsertExpenseModal
        title={'Add Expense'}
        modalOpen={insertExpenseModal}
        setModalOpen={setInsertExpenseModal}
        loading={createExpenseLoading}
        expense={expenseDetails}
        setExpense={setExpenseDetails}
        expenseCategories={expenseCategory}
        terminals={allTerminals}
        handleSubmit={createExpense}
        terminalBalances={balance.terminal}
        maxAmount={maxAmount}
        setMaxAmount={setMaxAmount}
      />
      {editExpenseModal && (
        <InsertExpenseModal
          title={'Edit Expense'}
          modalOpen={editExpenseModal}
          setModalOpen={setEditExpenseModal}
          loading={editExpenseLoading}
          expense={editExpenseDetails}
          setExpense={setEditExpenseDetails}
          expenseCategories={expenseCategory}
          terminals={allTerminals}
          terminalBalances={balance.terminal}
          maxAmount={maxEditeAmount}
          setMaxAmount={setMaxEditeAmount}
          handleSubmit={submitEditExpense}
          isEdit={true}
        />
      )}
      <ConfirmModal
        modalOpen={deleteConfirmModal}
        setModalOpen={setDeleteConfirmModal}
        title={'Do you want to delete the expense?'}
        loading={deleteConfirmLoading}
        handleSubmit={confirmDelete}
        afterClose={() => {
          setDeleteExpenseId(null);
        }}
      />
    </div>
  );
};

export default Page;
