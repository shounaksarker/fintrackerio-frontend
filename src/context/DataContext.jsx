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
} from '@/helpers/frontend/apiEndpoints';
import { getDateRange, getPreviousMonthDateRange } from '@/helpers/frontend/formateDate';
import { fetchRecord } from '@/helpers/frontend/others';
import { getUserDetails } from '@/helpers/frontend/getUserDetails';
import { USER } from '@/assets/constants';

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

  // others
  const fetchWithForce = () => {
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
        // <----- others ----->
        dateRange,
        setDateRange,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        fetchForce,
        fetchWithForce,
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
