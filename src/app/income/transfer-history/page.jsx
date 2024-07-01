'use client';

import React, { useContext, useEffect } from 'react';
import CustomTable from '@/components/fields/Table';
import { INCOME_TRANSFER_TABLE_HEADER } from '@/assets/constants';
import { DataContext } from '@/context/DataContext';

const Page = () => {
  const {
    fetchForce,
    endDate,
    dateRange,
    distributedIn,
    fetchDistributedIn,
    distributedLoading,
    setDistributedLoading,
  } = useContext(DataContext);
  useEffect(() => {
    if (!distributedIn.length || fetchForce || endDate) {
      fetchDistributedIn();
    } else {
      setDistributedLoading(false);
    }
  }, [dateRange]);
  return (
    <div>
      <h3 className="my-6 text-center text-2xl font-bold text-pGray underline underline-offset-4">
        Transfer History
      </h3>
      <CustomTable
        headers={INCOME_TRANSFER_TABLE_HEADER}
        data={distributedIn}
        loading={distributedLoading}
        enablePagination
        dataPerPage={10}
        className={'w-full'}
        tableClass={'rounded-md p-4 shadow-md'}
      />
    </div>
  );
};

export default Page;
