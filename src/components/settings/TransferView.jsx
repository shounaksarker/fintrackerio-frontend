'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import OnOffToggle from '@/components/fields/OnOffToggle';
import SelectOption from '@/components/fields/Select';
import { DataContext } from '@/context/DataContext';
import Button from '@/components/fields/Button';
import { AUTO_TRANSFER_URL, EXPENSE_CATEGORY_URL, INCOME_SOURCE_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';
import Shimmer from '@/components/fields/Shimmer';
import TipsModal from '@/components/modals/TipsModal';
import { CATEGORY_VALUE } from '@/assets/constants/stateValue';
import CategoryModal from '@/components/modals/CategoryModal';
import { BALANCE_TITLE } from '@/assets/constants';

const TransferView = () => {
  const {
    incomeSources,
    fetchIncomeSource,
    expenseCategory,
    fetchExpenseCategory,
    getATDetails,
    transferInfo,
    setTransferInfo,
    aTInfoLoading,
  } = useContext(DataContext);
  const [checked, setChecked] = useState(false);
  const [tipsModalOpen, setTipsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [incomeCategoryValue, setIncomeCategoryValue] = useState({});
  const [expenseCategoryValue, setExpenseCategoryValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryType, setCategoryType] = useState('income');

  const handleTransfer = (e) => {
    setTransferInfo({ ...transferInfo, [e.target.name]: e.target.value });
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
    setTransferInfo({ ...transferInfo, is_transfer_allowed: !checked });
    if (checked) {
      setATDetails({ is_transfer_allowed: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setATDetails(transferInfo);
  };

  const isIncome = () => categoryType.toLowerCase() === BALANCE_TITLE.INCOME.toLowerCase();

  const handleCategory = (e, name) => {
    const categories = isIncome() ? { ...incomeCategoryValue } : { ...expenseCategoryValue };
    if (name) {
      categories[name] = e;
    } else {
      categories[e.target.name] = e.target.value;
    }

    if (isIncome()) setIncomeCategoryValue(categories);
    else setExpenseCategoryValue(categories);
  };

  const createSource = async (e) => {
    e.preventDefault();
    const url = isIncome() ? INCOME_SOURCE_URL : EXPENSE_CATEGORY_URL;
    const value = isIncome() ? incomeCategoryValue : expenseCategoryValue;
    const setValue = isIncome() ? setIncomeCategoryValue : setExpenseCategoryValue;
    const fetchSource = isIncome() ? fetchIncomeSource : fetchExpenseCategory;

    setLoading(true);
    const res = await axios.post(url, value);

    if (res.data.success) {
      notification(res.data.msg, { type: 'success', id: 'createSource' });
      setValue(CATEGORY_VALUE);
      setModalOpen(false);
      fetchSource();
    } else {
      notification(res.data.msg || 'Failed to add category', { type: 'error', id: 'createSource' });
    }
    setLoading(false);
  };

  const openModal = (type) => {
    setCategoryType(type);
    setModalOpen(true);
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
  useEffect(() => {
    setChecked(transferInfo.is_transfer_allowed);
  }, [transferInfo.is_transfer_allowed]);
  return (
    <div>
      <div className="flex flex-col justify-between gap-y-4 md:flex-row md:items-center md:gap-y-0">
        <div>
          Do you want to forward your <b>remaining balance</b> to the next month? :{' '}
          <button
            className="animate-pulse rounded-full border border-fuchsia-400 px-0.5 text-xs font-semibold text-fuchsia-600"
            onClick={() => setTipsModalOpen(true)}
          >
            ?
          </button>
        </div>
        {aTInfoLoading ? (
          <Shimmer className="h-9 rounded-md" shimmerClass="max-w-20" />
        ) : (
          <OnOffToggle onChange={() => onToggle()} checked={checked} />
        )}
      </div>
      {checked ? (
        <div className="mt-8">
          <SelectOption
            className="!mb-1 size-full"
            name="expenseCategoryId"
            label="Spend From"
            onChange={(e) => handleTransfer(e)}
            value={transferInfo.expenseCategoryId}
            placeholder="Select one"
            labelClass="font-normal"
            options={expenseCategory}
            optionLabel="name"
            optionValue="expense_category_id"
            required
          />

          <Button
            size="sm"
            color="none"
            type=" "
            className="w-full justify-end border-none !p-1 text-xs text-pest"
            onClick={() => {
              openModal('expense');
            }}
          >
            (Create Expense Category if needed)
          </Button>

          <SelectOption
            className="!mb-1 size-full"
            name="incomeCategoryId"
            label="Received In"
            onChange={(e) => handleTransfer(e)}
            value={transferInfo.incomeCategoryId}
            placeholder="Select one"
            labelClass="font-normal"
            options={incomeSources}
            optionLabel="name"
            optionValue="income_category_id"
            required
          />
          <Button
            size="sm"
            color="none"
            type=" "
            className="w-full justify-end border-none !p-1 text-xs text-pest"
            onClick={() => {
              openModal('income');
            }}
          >
            (Create Income Source if needed)
          </Button>
          <Button
            loading={submitLoading}
            color="primary"
            className={`${submitLoading ? 'max-w-[140px]' : 'max-w-[90px]'}`}
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      ) : null}
      {tipsModalOpen && <TipsModal modalOpen={tipsModalOpen} setModalOpen={setTipsModalOpen} />}

      {modalOpen && (
        <CategoryModal
          type={categoryType}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          handleCategory={handleCategory}
          data={isIncome() ? incomeCategoryValue : expenseCategoryValue}
          title={isIncome() ? 'Add Income Source' : 'Add Expense Category'}
          handleSubmit={createSource}
          loading={loading}
          inputTitle="Category Name"
          placeholder={`Ex: ${isIncome() ? 'Added from previous month' : 'Send to next month'}`}
        />
      )}
    </div>
  );
};

export default TransferView;
