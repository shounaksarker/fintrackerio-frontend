'use client';

import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import ChevronRight from '@/assets/svg/Icon/ChevronRight';
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
        <div className="flex flex-col p-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-x-1 md:gap-x-4 ">
            <div className="text-xs md:text-base ">
              Hi! <span className="font-semibold capitalize">{user?.username}</span>
            </div>
            <div className="flex gap-x-0">
              <ChevronRight />
              <ChevronRight className={'-ml-3'} />
            </div>
            <div className="text-xs text-pGray md:text-base">{moment().format('MMMM DD, YYYY')}</div>
            <NotificationBell />
          </div>
          {!isDateRangeHidden && <DateRangePicker className={sidebarOpen ? '-z-50' : 'z-10'} />}
        </div>
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
