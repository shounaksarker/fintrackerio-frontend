'use client';

import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@/components/fields/Modal';
import SelectOption from '@/components/fields/Select';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';
import { formattedAmount } from '@/helpers/frontend/getSum';

const InsertExpenseModal = ({
  modalOpen,
  setModalOpen,
  loading,
  title,
  expense,
  setExpense,
  expenseCategories,
  terminals,
  handleSubmit,
  terminalBalances,
  maxAmount,
  setMaxAmount,
  isEdit = false,
}) => {
  const handleExpense = (e) => {
    const { name, value, type } = e.target;
    const data = { ...expense };
    data[name] = type === 'number' ? Number(value) : value;
    setExpense(data);
  };
  useEffect(() => {
    if (expense.terminal_id) {
      const selectedTerminal = terminalBalances.find(
        (terminal) => terminal.terminal_id === Number(expense.terminal_id)
      );

      if (isEdit && selectedTerminal && selectedTerminal.terminal_id === expense.terminal_id) {
        setMaxAmount(selectedTerminal.balance + Number(expense.amount) || 0);
      } else {
        setMaxAmount(selectedTerminal?.balance || 0);
      }
    }
  }, [expense.terminal_id]);
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
            className="size-full"
            selectClass="text-md font-thin"
            name="expense_category_id"
            label="Category"
            onChange={(e) => handleExpense(e)}
            value={expense.expense_category_id}
            placeholder="Select Expense Category"
            labelClass="font-normal"
            options={expenseCategories}
            optionLabel="name"
            optionValue="expense_category_id"
            required
          />
          <SelectOption
            className="size-full"
            name="terminal_id"
            label="Spend From"
            onChange={(e) => handleExpense(e)}
            value={expense.terminal_id}
            placeholder="Select Terminal"
            labelClass="font-normal"
            options={terminals}
            optionLabel="terminal_name"
            optionValue="terminal_id"
            required
          />
          <InputField
            className="size-full "
            type="number"
            name="amount"
            label="Amount"
            step={1}
            onChange={(e) => handleExpense(e)}
            value={Number(expense.amount)}
            placeholder={`Max: ${formattedAmount(maxAmount)}`}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            max={maxAmount}
            error={
              expense.amount > maxAmount
                ? `Insufficient balance.(Balance: ${formattedAmount(maxAmount)})`
                : ''
            }
            required
          />
          <InputField
            className="size-full "
            type="text"
            name="spend_on"
            label="Spend For"
            onChange={(e) => handleExpense(e)}
            value={expense.spend_on}
            placeholder="Online Food"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            required
          />
          <InputField
            className="size-full "
            type="text"
            name="description"
            label="Description"
            onChange={(e) => handleExpense(e)}
            value={expense.description}
            placeholder="Enter description (optional)"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          <label className="mb-2 block text-sm font-normal text-gray-700">Date</label>
          <div className="custom-border mb-2 w-full py-1">
            <DatePicker
              showIcon
              selected={expense.date}
              onChange={(date) => setExpense({ ...expense, date })}
              calendarClassName=""
              className="ml-2 font-normal text-pBlack"
              dateFormat={'dd/MM/yyyy'}
            />
          </div>
          <Button type="submit" className="flex w-full justify-center" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default InsertExpenseModal;
