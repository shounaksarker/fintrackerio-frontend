'use client';

import React from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@/components/fields/Modal';
import SelectOption from '@/components/fields/Select';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';
import { RECURRING_INTERVAL } from '@/assets/constants';

const IncomeModal = ({ modalOpen, setModalOpen, loading, data, setData, incomeSources, handleSubmit }) => {
  const handleIncome = (e) => {
    const { name, value, type } = e.target;
    const payload = { ...data };

    payload[name] = type === 'number' ? Number(value) : value;
    setData(payload);
  };
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack">Add Income Details</h1>
        <form onSubmit={handleSubmit}>
          <SelectOption
            className="size-full"
            name="income_category_id"
            label="Source Name"
            onChange={(e) => handleIncome(e)}
            value={data.income_category_id}
            placeholder="Select one"
            labelClass="font-normal"
            options={incomeSources}
            optionLabel="name"
            optionValue="income_category_id"
            required
          />
          <InputField
            className="size-full "
            type="number"
            name="amount"
            label="Amount"
            step={0.01}
            onChange={(e) => handleIncome(e)}
            value={Number(data.amount)}
            placeholder="Ex: 1500"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            required
          />
          <label className="mb-2 block text-sm font-normal text-gray-700">
            Date <sup className="text-red-500">*</sup>
          </label>
          <div className="custom-border mb-2 w-full py-1">
            <DatePicker
              showIcon
              selected={data.date}
              onChange={(date) => setData({ ...data, date })}
              calendarClassName=""
              className="ml-2 font-normal text-pBlack"
              dateFormat={'dd/MM/yyyy'}
              placeholderText={'placeholderText'}
            />
          </div>
          {data.is_recurring !== undefined && (
            <div
              onClick={() => setData({ ...data, is_recurring: !data.is_recurring })}
              className="mb-4 mt-2 flex cursor-pointer items-center justify-between rounded-md p-1"
            >
              <label className="cursor-pointer text-sm font-medium text-gray-500">
                🔄 Set as Repeatative Income
              </label>
              <input type="checkbox" checked={data.is_recurring || false} />
            </div>
          )}
          {data.is_recurring && (
            <SelectOption
              className="mb-4 size-full"
              name="recurrence_interval"
              label="Frequency"
              onChange={(e) => handleIncome(e)}
              value={data.recurrence_interval || RECURRING_INTERVAL.MONTHLY}
              labelClass="font-normal"
              options={[
                { label: 'Weekly', value: RECURRING_INTERVAL.WEEKLY },
                { label: 'Monthly', value: RECURRING_INTERVAL.MONTHLY },
                { label: 'Yearly', value: RECURRING_INTERVAL.YEARLY },
              ]}
              optionLabel="label"
              optionValue="value"
              required
            />
          )}
          <InputField
            className="size-full "
            type="text"
            name="description"
            label="Description"
            onChange={(e) => handleIncome(e)}
            value={data.description}
            placeholder="Enter description (optional)"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <Button type="submit" className="flex w-full justify-center" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default IncomeModal;
