'use client';

import axios from 'axios';
import React, { createContext, useState } from 'react';
import { notification } from '@/components/notification';
import {
  INCOME_RECORD_URL,
  EXPENSE_RECORD_URL,
  GET_MONTHLY_SUMMERY_URL,
  INCOME_SOURCE_URL,
  INCOME_DISTRIBUTION_URL,
  EXPENSE_CATEGORY_URL,
  GET_USER_URL,
  AUTO_TRANSFER_URL,
  GET_TERMINALS_URL,
  GET_RECURRING_URL,
} from '@/helpers/frontend/apiEndpoints';
import { getDateRange, getPreviousMonthDateRange } from '@/helpers/frontend/formateDate';
import { fetchRecord } from '@/helpers/frontend/others';
import { getUserDetails } from '@/helpers/frontend/getUserDetails';
import { USER } from '@/assets/constants';
import { REMAIN_TRANSFER_VALUE } from '@/assets/constants/stateValue';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [balance, setBalance] = useState({});
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [yearlySummery, setYearlySummery] = useState();

  const [incomeData, setIncomeData] = useState([]);
  const [incomeLoading, setIncomeLoading] = useState(true);
  const [incomeSources, setIncomeSources] = useState([]);
  const [incomeSourceLoading, setIncomeSourceLoading] = useState(true);

  const [expenseData, setExpenseData] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [expenseCategoryLoading, setExpenseCategoryLoading] = useState(true);
  const [expenseLoading, setExpenseLoading] = useState([]);

  const [distributedIn, setDistributedIn] = useState([]);
  const [distributedLoading, setDistributedLoading] = useState(true);

  const [transferInfo, setTransferInfo] = useState(REMAIN_TRANSFER_VALUE);
  const [aTInfoLoading, setATInfoLoading] = useState(true);

  const [allTerminals, setAllTerminals] = useState([]);
  const [allTerminalsLoading, setAllTerminalsLoading] = useState(true);

  const [recurringData, setRecurringData] = useState({ expense: [], income: [] });
  const [recurringLoading, setRecurringLoading] = useState(true);

  // others
  const [user, setUser] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState(getDateRange());
  const [previousDateRange, setPreviousDateRange] = useState(getPreviousMonthDateRange(dateRange));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fetchForce, setFetchForce] = useState(false);

  // get balance data
  const fetchBalance = async () => {
    const res = await axios.post(GET_MONTHLY_SUMMERY_URL, dateRange);
    if (res.data.success) {
      setBalance(res.data.data);
    } else {
      notification(res.data.msg || 'Failed to load Balance', { type: 'error', id: 'balanceError' });
    }
    setBalanceLoading(false);
  };

  // get income record data
  const fetchIncomeRecord = () => {
    fetchRecord(INCOME_RECORD_URL, setIncomeData, setIncomeLoading, { dateRange });
  };

  // get income sources
  const fetchIncomeSource = async () => {
    try {
      const res = await axios.get(INCOME_SOURCE_URL);
      if (res.data.success) {
        setIncomeSources(res.data.data);
      } else {
        notification(res.data.msg || 'Failed to load Income Source.', { type: 'error', id: 'fetcherror' });
      }
      setIncomeSourceLoading(false);
    } catch (err) {
      return err;
    }
  };

  // get expense record data
  const fetchExpenseRecord = () => {
    fetchRecord(EXPENSE_RECORD_URL, setExpenseData, setExpenseLoading, { dateRange });
  };
  // get expense category
  const fetchExpenseCategory = async () => {
    try {
      const res = await axios.get(EXPENSE_CATEGORY_URL);
      if (res.data.success) {
        setExpenseCategory(res.data.data);
      } else {
        notification(res.data.msg || 'Failed to load Expense Category.', { type: 'error', id: 'fetcherror' });
      }
      setExpenseCategoryLoading(false);
    } catch (err) {
      return err;
    }
  };

  const fetchDistributedIn = async () => {
    try {
      const res = await axios.post(INCOME_DISTRIBUTION_URL, dateRange);
      if (res.data.success) {
        setDistributedIn(res.data.data);
      } else {
        notification(res.data.msg || 'Failed to load Distributed data.', {
          type: 'error',
          id: 'distributeError',
        });
      }
      setDistributedLoading(false);
    } catch (err) {
      return err;
    }
  };

  // get user_settings details (Auto Transfer);
  const getATDetails = async () => {
    setATInfoLoading(true);
    try {
      const res = await axios.get(AUTO_TRANSFER_URL);
      if (res.data.success) {
        const obj = {
          is_transfer_allowed: res.data.data.is_transfer_allowed || false,
          expenseCategoryId: res.data.data.transfer_info?.expenseCategoryId || '',
          incomeCategoryId: res.data.data.transfer_info?.incomeCategoryId || '',
        };
        setTransferInfo(obj);
      } else {
        notification(res.data.msg || 'Failed to load info.', { type: 'error', id: 'atError' });
      }
    } catch (err) {
      notification(err.message || 'An error occured.', { type: 'error', id: 'atError' });
    }
    setATInfoLoading(false);
  };

  const fetchRecurringData = async () => {
    setRecurringLoading(true);
    try {
      const res = await axios.get(GET_RECURRING_URL);
      if (res.data?.success && res.data?.data) {
        setRecurringData(res.data.data);
      } else {
        notification(res.data.msg || 'Failed to load Recurring Data.', { type: 'error', id: 'fetcherror' });
      }
      setRecurringLoading(false);
    } catch (err) {
      return err;
    }
  };

  // get all terminals
  const fetchTerminal = async (force = false) => {
    if (!allTerminals.length || force) {
      try {
        setAllTerminalsLoading(true);
        const res = await axios.get(GET_TERMINALS_URL);

        if (res.data.success) {
          setAllTerminals(res.data.data);
        } else {
          notification(res.data.msg || 'Failed to load Terminals', { type: 'error', id: 'terminalsError' });
        }
        setIncomeLoading(false);
        setAllTerminalsLoading(false);
      } catch (err) {
        return err;
      }
    }
  };

  // others
  const callMultipleFunctions = () => {
    setFetchForce(true);
    setTimeout(() => {
      setFetchForce(false);
    }, 1500);
  };

  const getUser = async () => {
    if (typeof window !== 'undefined') {
      const userFromStorage = localStorage.getItem(USER);
      if (userFromStorage) {
        const userData = JSON.parse(userFromStorage);
        setUser(userData);
        return;
      }

      const res = await axios.get(GET_USER_URL);
      if (res.data.success) {
        setUser(res.data.data);
        localStorage.setItem(USER, JSON.stringify(res.data.data));
        return;
      }
      notification(res.data.msg || 'Failed to load User.', { type: 'error', id: 'userFetchError' });
      setUser(await getUserDetails());
    }
  };

  return (
    <DataContext.Provider
      value={{
        // <----- balance ----->
        balance,
        setBalance,
        balanceLoading,
        setBalanceLoading,
        fetchBalance,
        // <----- expesne ----->
        expenseCategory,
        setExpenseCategory,
        expenseCategoryLoading,
        setExpenseCategoryLoading,
        fetchExpenseCategory,
        expenseData,
        setExpenseData,
        expenseLoading,
        setExpenseLoading,
        fetchExpenseRecord,
        // <----- income ----->
        incomeSources,
        setIncomeSources,
        fetchIncomeSource,
        incomeSourceLoading,
        setIncomeSourceLoading,
        incomeData,
        setIncomeData,
        incomeLoading,
        setIncomeLoading,
        fetchIncomeRecord,
        // <----- income distribution details ----->
        distributedIn,
        setDistributedIn,
        fetchDistributedIn,
        distributedLoading,
        setDistributedLoading,
        // <----- Auto transfer amount from prev to next month ----->
        getATDetails,
        transferInfo,
        setTransferInfo,
        aTInfoLoading,
        setATInfoLoading,
        // <----- terminals ----->
        fetchTerminal,
        allTerminals,
        setAllTerminals,
        allTerminalsLoading,
        setAllTerminalsLoading,
        // <----- recurring ----->
        recurringData,
        setRecurringData,
        recurringLoading,
        setRecurringLoading,
        fetchRecurringData,
        // <----- others ----->
        dateRange,
        setDateRange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        fetchForce,
        callMultipleFunctions,
        previousDateRange,
        setPreviousDateRange,
        user,
        getUser,
        sidebarOpen,
        setSidebarOpen,
        yearlySummery,
        setYearlySummery,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
