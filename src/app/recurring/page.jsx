'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomTable from '@/components/fields/Table';
import { formattedAmount } from '@/helpers/frontend/getSum';
import { GET_RECURRING_URL } from '@/helpers/frontend/apiEndpoints';
import { CURRENCY } from '@/assets/constants';
import { getDate } from '@/helpers/frontend/formateDate';

const Page = () => {
  const [recurringData, setRecurringData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecurringData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(GET_RECURRING_URL);
      if (res.data?.success && res.data?.data) {
        setRecurringData(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecurringData();
  }, []);

  const recurringHeader = [
    { label: '#', style: 'w-[5%] text-center', index: true },
    {
      label: 'Type',
      style: 'w-[20%] text-center',
      target: 'type',
    },
    {
      label: 'Spend On',
      style: 'w-[20%] capitalize',
      target: 'spend_on',
    },
    {
      label: 'Description',
      style: 'w-[20%] capitalize truncate',
      target: 'description',
    },
    {
      label: `Amount (${CURRENCY})`,
      style: 'w-[15%] font-semibold md:pl-3',
      target: 'amount',
      thStyle: '!pl-0',
      function: formattedAmount,
    },
    {
      label: 'Interval',
      style: 'w-[15%] capitalize',
      target: 'recurrence_interval',
    },
    {
      label: 'Next Execution',
      style: 'w-[20%]',
      target: 'next_execution_date',
      function: getDate,
    },
    {
      label: 'Status',
      style: 'w-[10%]',
      target: 'is_active',
      function: (val) => (
        <span
          className={`rounded-full px-2 py-1 text-xs ${val ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {val ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h3 className="my-6 text-center text-2xl font-bold text-pGray underline underline-offset-4">
        Repeatative Expenses
      </h3>
      <CustomTable
        headers={recurringHeader}
        data={recurringData}
        loading={loading}
        className={'w-full'}
        tableClass={'rounded-md p-4 shadow-md bg-white'}
      />
    </div>
  );
};

export default Page;
