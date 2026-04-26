'use client';

import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import DateRangePicker from '@/components/fields/DateRangePicker';
import { DataContext } from '@/context/DataContext';
import { AUTH_PATH, HIDDEN_DATE_RANGE_PATH } from '@/assets/constants/conditionalPath';
import { handleAutoTransfer, isObjectEmpty } from '@/helpers/frontend/others';
import ConfirmModal from './modals/ConfirmModal';
import { TRANSFER_TO_NEXT_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from './notification';
import NotificationBell from './notifications/NotificationBell';
import { CURRENCY } from '@/assets/constants';

const Header = () => {
  const { user, sidebarOpen, fetchBalance, fetchIncomeRecord, fetchExpenseRecord } = useContext(DataContext);
  const [transferDetails, setTransferDetails] = useState(null);
  const [transferNextModal, setTransferNextModal] = useState(false);
  const [transferNextLoading, setTransferNextLoading] = useState(false);
  const pathName = usePathname();
  const isAuthPage = AUTH_PATH.includes(pathName);
  const isDateRangeHidden = HIDDEN_DATE_RANGE_PATH(pathName);

  const submitTransferToNext = async (e) => {
    e.preventDefault();
    setTransferNextLoading(true);
    const { remain, ...restDetails } = transferDetails;
    const res = await axios.post(TRANSFER_TO_NEXT_URL, restDetails);
    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'atError' });
      fetchBalance();
      fetchIncomeRecord();
      fetchExpenseRecord();
      setTransferNextModal(false);
    } else {
      notification(res.data.msg || 'Failed to transfer', { type: 'error', id: 'atError' });
    }
    setTransferNextLoading(false);
  };

  useEffect(() => {
    const fetchTransferDetails = async () => {
      const details = await handleAutoTransfer();
      setTransferDetails(details);
      if (!isObjectEmpty(details)) {
        setTransferNextModal(true);
      }
    };
    fetchTransferDetails();
  }, []);

  return (
    <>
      {!isAuthPage && (
        <header className="relative z-30 px-2 pt-3 md:px-4 lg:px-6">
          <div className="app-surface flex flex-col gap-3 rounded-2xl p-3 pr-8 md:flex-row md:items-center md:justify-between md:px-4 md:pr-8 lg:pr-4">
            <div className="flex min-w-0 items-center justify-between gap-3 md:min-w-fit md:flex-1">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pest via-finance-accent to-finance-pink text-sm font-black text-white shadow-glow">
                  FT
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-finance-ink md:text-base">
                    Hi, <span className="capitalize">{user?.username || 'there'}</span>
                  </div>
                  <div className="text-xs font-medium text-finance-muted md:text-sm">
                    {moment().format('dddd, MMMM DD, YYYY')}
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <NotificationBell />
              </div>
            </div>
            {!isDateRangeHidden && <DateRangePicker className={sidebarOpen ? '-z-50' : 'z-10'} />}
          </div>
        </header>
      )}
      {transferNextModal ? (
        <ConfirmModal
          modalOpen={transferNextModal}
          setModalOpen={setTransferNextModal}
          title={`Would you like to carry over your remaining balance (${CURRENCY}${transferDetails.remain}) from last month to this month?`}
          loading={transferNextLoading}
          handleSubmit={submitTransferToNext}
        />
      ) : null}
    </>
  );
};

export default Header;
