'use client';

/* eslint-disable eslint-plugin/prefer-message-ids, eslint-plugin/prefer-object-rule, eslint-plugin/require-meta-type, eslint-plugin/require-meta-schema */

import React from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@/components/fields/Modal';
import SelectOption from '@/components/fields/Select';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';
import { formattedAmount } from '@/helpers/frontend/getSum';
import { RECURRING_INTERVAL } from '@/assets/constants';
import { EXPENSE_CATEGORY_ICONS } from '@/assets/constants/categoryIcons';

const InsertExpenseModal = ({
  modalOpen,
  setModalOpen,
  loading,
  title,
  expense,
  setExpense,
  expenseCategories = [],
  terminals = [],
  handleSubmit,
  terminalBalances = [],
  maxAmount,
  isEdit = false,
}) => {
  const categoryOptions = expenseCategories.map((category) => {
    const localIcon = EXPENSE_CATEGORY_ICONS.find(
      (item) => item.name.toLowerCase() === category.name?.toLowerCase()
    );
    return {
      ...category,
      icon: localIcon?.icon || category.icon,
    };
  });

  const handleExpense = (e) => {
    const { name, value, type } = e.target;
    const data = { ...expense };
    data[name] = type === 'number' ? Number(value) : value;
    setExpense(data);
  };
  const selectedTerminal = terminalBalances.find(
    (terminal) => terminal.terminal_id === Number(expense.terminal_id)
  );
  const effectiveMaxAmount =
    isEdit && selectedTerminal && selectedTerminal.terminal_id === expense.terminal_id
      ? selectedTerminal.balance + Number(expense.amount || 0)
      : selectedTerminal?.balance || maxAmount || 0;

  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl  shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack underline underline-offset-4">
          {title}
        </h1>
        <form onSubmit={handleSubmit}>
          <SelectOption
            className="w-full"
            selectClass="text-md font-medium"
            name="expense_category_id"
            label="Category"
            onChange={(e) => handleExpense(e)}
            value={expense.expense_category_id}
            placeholder="Select Expense Category"
            labelClass="font-medium"
            options={categoryOptions}
            optionLabel="name"
            optionValue="expense_category_id"
            required
          />
          <SelectOption
            className="w-full"
            name="terminal_id"
            selectClass="text-md font-medium"
            label="Spend From"
            onChange={(e) => handleExpense(e)}
            value={expense.terminal_id}
            placeholder="Select Wallet"
            labelClass="font-medium"
            options={terminals}
            optionLabel="terminal_name"
            optionValue="terminal_id"
            required
          />
          <InputField
            className="w-full"
            type="number"
            name="amount"
            label="Amount"
            step={1}
            onChange={(e) => handleExpense(e)}
            value={Number(expense.amount)}
            placeholder={`Max: ${formattedAmount(effectiveMaxAmount)}`}
            labelClass="font-medium"
            inputClass="placeholder:text-xs border-2"
            max={effectiveMaxAmount}
            error={
              expense.amount > effectiveMaxAmount
                ? `Insufficient balance.(Balance: ${formattedAmount(effectiveMaxAmount)})`
                : ''
            }
            required
          />
          <InputField
            className="w-full"
            type="text"
            name="spend_on"
            label="Spend For"
            onChange={(e) => handleExpense(e)}
            value={expense.spend_on}
            placeholder="Online Food"
            labelClass="font-medium"
            inputClass="placeholder:text-xs border-2"
            required
          />
          <InputField
            className="w-full"
            type="text"
            name="description"
            label="Description"
            onChange={(e) => handleExpense(e)}
            value={expense.description}
            placeholder="Enter description (optional)"
            labelClass="font-medium"
            inputClass="placeholder:text-xs border-2"
          />
          <label className="mb-2 block text-sm tracking-wide text-finance-muted">Date</label>
          <div className="custom-border mb-2 flex min-h-11 w-full items-center rounded-xl px-2">
            <DatePicker
              showIcon
              selected={expense.date}
              onChange={(date) => setExpense({ ...expense, date })}
              calendarClassName=""
              className="w-full bg-transparent text-sm font-medium text-finance-ink"
              dateFormat={'dd/MM/yyyy'}
            />
          </div>
          {expense.is_recurring !== undefined && (
            <div
              onClick={() => setExpense({ ...expense, is_recurring: !expense.is_recurring })}
              className="mb-4 mt-2 flex cursor-pointer items-center justify-between rounded-md p-1"
            >
              <label className="cursor-pointer text-sm font-medium text-gray-500">
                🔄 Set as Repeatative Expense
              </label>
              <input type="checkbox" checked={expense.is_recurring || false} readOnly />
            </div>
          )}
          {expense.is_recurring && (
            <SelectOption
              className="mb-4 w-full"
              name="recurrence_interval"
              label="Frequency"
              onChange={(e) => handleExpense(e)}
              value={expense.recurrence_interval || RECURRING_INTERVAL.MONTHLY}
              labelClass="font-medium"
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
          <Button type="submit" className="flex w-full justify-center" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default InsertExpenseModal;
