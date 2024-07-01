'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@/components/fields/Modal';
import SelectOption from '@/components/fields/Select';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';

const InsertExpenseModal = ({
  modalOpen,
  setModalOpen,
  loading,
  expense,
  setExpense,
  expenseCategories,
  terminals,
  handleSubmit,
  terminalBalances,
}) => {
  const [maxBalance, setMaxBalance] = useState(0);
  const handleExpense = (e) => {
    const { name, value, type } = e.target;
    const data = { ...expense };

    data[name] = type === 'number' ? Number(value) : value;
    if (name === 'terminal_id') {
      const selectedTerminal = terminalBalances.find((terminal) => terminal.terminal_id === Number(value));
      if (selectedTerminal) {
        setMaxBalance(selectedTerminal.balance);
      } else {
        setMaxBalance(0);
      }
    }
    setExpense(data);
  };
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack">Add Expense Details</h1>
        <form onSubmit={handleSubmit}>
          <SelectOption
            className="size-full"
            selectClass="text-md font-thin"
            name="expense_category_id"
            label="Category *"
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
            label="Spend From *"
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
            value={expense.amount}
            placeholder={`Max: ${maxBalance}`}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            max={maxBalance}
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
            value={expense.name}
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
