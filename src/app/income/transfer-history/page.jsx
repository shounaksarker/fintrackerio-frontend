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
    <div className="page-shell">
      <div className="page-toolbar">
        <div>
          <h1 className="page-title">Transfer History</h1>
          <p className="page-subtitle">Review how income was distributed into terminals.</p>
        </div>
      </div>
      <CustomTable
        headers={INCOME_TRANSFER_TABLE_HEADER}
        data={distributedIn}
        loading={distributedLoading}
        enablePagination
        className={'w-full'}
        enableDetailsView={false}
        emptyTitle="No transfer history yet"
        emptyDescription="Income distribution and wallet transfers for the selected period will appear here."
      />
    </div>
  );
};

export default Page;
