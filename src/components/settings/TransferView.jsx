'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OnOffToggle from '@/components/fields/OnOffToggle';
import SelectOption from '@/components/fields/Select';
import { DataContext } from '@/context/DataContext';
import { REMAIN_TRANSFER_VALUE } from '@/assets/constants/stateValue';
import Button from '@/components/fields/Button';
import { AUTO_TRANSFER_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import Shimmer from '@/components/fields/Shimmer';

const TransferView = () => {
  const { incomeSources, fetchIncomeSource, expenseCategory, fetchExpenseCategory } = useContext(DataContext);
  const [transferInfo, setTransferInfo] = useState(REMAIN_TRANSFER_VALUE);
  const [checked, setChecked] = useState(false);
  const [infoLoading, setInfoLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleTransfer = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value });
  };

  const getATDetails = async () => {
    setInfoLoading(true);
    try {
      const res = await axios.get(AUTO_TRANSFER_URL);
      if (res.data.success) {
        const obj = {
          remainingTransfer: res.data.data.remaining_transfer || false,
          expenseTerminal: res.data.data.transfer_info?.expenseTerminal || '',
          incomeTerminal: res.data.data.transfer_info?.incomeTerminal || '',
        };
        setTransferInfo(obj);
        setChecked(obj.remainingTransfer);
      } else {
        notification(res.data.msg || 'Failed to load info.', { type: 'error', id: 'fetcherror' });
      }
    } catch (err) {
      notification(err.message || 'An error occured.');
    }
    setInfoLoading(false);
  };

  const setATDetails = async (info) => {
    setSubmitLoading(true);
    try {
      const res = await axios.patch(AUTO_TRANSFER_URL, info);
      if (res.data.success) {
        notification('Setting Updated', { type: 'success', id: 'settingInfo' });
      } else {
        notification(res.data.msg || 'Failed to load info.', { type: 'error', id: 'settingInfo' });
      }
    } catch (err) {
      return err;
    }
    setSubmitLoading(false);
  };

  const onToggle = async () => {
    setChecked(!checked);
    setTransferInfo({ ...transferInfo, remainingTransfer: !checked });
    if (checked) {
      setATDetails({ transfer: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setATDetails(transferInfo);
  };

  useEffect(() => {
    if (!incomeSources.length) {
      fetchIncomeSource();
    }
    if (!expenseCategory.length) {
      fetchExpenseCategory();
    }
    getATDetails();
  }, []);
  return (
    <div>
      <div className="flex flex-col justify-between gap-y-4 md:flex-row md:items-center md:gap-y-0">
        <span>
          Do you want to transfer <b>remaining balance</b> to the next month? :
        </span>
        {infoLoading ? (
          <Shimmer className="h-9 rounded-md" shimmerClass="max-w-20" />
        ) : (
          <OnOffToggle onChange={() => onToggle()} checked={checked} />
        )}
      </div>
      {checked ? (
        <form className="mt-8 flex flex-col gap-y-2" onSubmit={handleSubmit}>
          <SelectOption
            className="size-full"
            name="expenseTerminal"
            label="Spend From"
            onChange={(e) => handleTransfer(e)}
            value={transferInfo.expenseTerminal}
            placeholder="Select one"
            labelClass="font-normal"
            options={expenseCategory}
            optionLabel="name"
            optionValue="expense_category_id"
            required
          />
          <SelectOption
            className="size-full"
            name="incomeTerminal"
            label="Received In"
            onChange={(e) => handleTransfer(e)}
            value={transferInfo.incomeTerminal}
            placeholder="Select one"
            labelClass="font-normal"
            options={incomeSources}
            optionLabel="name"
            optionValue="income_category_id"
            required
          />
          <Button
            loading={submitLoading}
            color="primary"
            className={`${submitLoading ? 'max-w-[140px]' : 'max-w-[90px]'}`}
            type="submit"
          >
            Submit
          </Button>
        </form>
      ) : null}
    </div>
  );
};

export default TransferView;
