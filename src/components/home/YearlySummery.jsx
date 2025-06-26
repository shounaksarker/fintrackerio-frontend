'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ScaleChart from '@/components/chart/Scale';
import { GET_YEARLY_SUMMERY_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import { DataContext } from '@/context/DataContext';

const YearlySummery = () => {
  const { yearlySummery, setYearlySummery, getUser } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  const fetchYearlySummery = async () => {
    const res = await axios.post(GET_YEARLY_SUMMERY_URL, { year: moment().format('yyyy') });
    if (res.data.success) {
      const months = [];
      const incomes = [];
      const expenses = [];
      const savings = [];
      Object.keys(res.data.data).forEach((month) => {
        months.push(month);
        incomes.push(Number(res.data.data[month].income || 0));
        expenses.push(Number(res.data.data[month].expense || 0));
        savings.push(Number(res.data.data[month].savings || 0));
      });
      setYearlySummery({
        months,
        incomes,
        expenses,
        savings,
      });
    } else {
      notification(res.data.msg || 'Failed to load Yearly Summery', { type: 'error', id: 'balanceError' });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!yearlySummery) {
      fetchYearlySummery();
    } else {
      setLoading(false);
    }
    getUser();
  }, []);

  return (
    !loading &&
    yearlySummery && (
      <div className="mt-2">
        <h2 className="mb-6 text-center text-lg font-semibold text-pGray">Year Summery</h2>
        <ScaleChart
          className={'w-full px-2 md:h-full'}
          xLabel={yearlySummery.months}
          data={[
            { label: 'Income', data: yearlySummery.incomes, hoverBackgroundColor: '#1d756c' },
            {
              label: 'Expense',
              data: yearlySummery.expenses,
              backgroundColor: '#ff63844d',
              hoverBackgroundColor: '#ff638475',
            },
            {
              label: 'Remain',
              data: yearlySummery.savings,
              backgroundColor: '#003bff87',
              hoverBackgroundColor: '#003bff9e',
            },
          ]}
        />
      </div>
    )
  );
};

export default YearlySummery;
