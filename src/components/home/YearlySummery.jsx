'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import ScaleChart from '@/components/chart/Scale';
import { GET_YEARLY_SUMMERY_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import { DataContext } from '@/context/DataContext';
import Shimmer from '@/components/fields/Shimmer';

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
    <>
      {loading && (
        <div className="app-surface rounded-3xl p-4 md:p-5">
          <Shimmer className="mb-4 h-6 w-44 rounded-xl" />
          <Shimmer className="h-[210px] rounded-2xl md:h-[250px]" />
        </div>
      )}
      {!loading && yearlySummery && (
        <div className="app-surface rounded-3xl py-4 md:py-5">
          <div className="mb-3 px-4 md:mb-5 md:px-5">
            <h2 className="text-lg font-black text-finance-ink">Year Summary</h2>
            <p className="text-xs font-medium text-finance-muted">
              Income, expense, and remaining balance by month
            </p>
          </div>
          <ScaleChart
            className={
              'min-h-[210px] w-full px-1 md:h-full md:max-h-[500px] md:min-h-[250px] md:px-5 xl:min-h-[320px]'
            }
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
                backgroundColor: '#7c3aed80',
                hoverBackgroundColor: '#7c3aed',
              },
            ]}
          />
        </div>
      )}
    </>
  );
};

export default YearlySummery;
