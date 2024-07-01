'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@/components/fields/Modal';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';
import SelectOption from '@/components/fields/Select';

const TransferModal = ({
  modalOpen,
  setModalOpen,
  loading,
  transfer,
  setTransfer,
  allTerminals,
  handleSubmit,
  terminalBalances,
}) => {
  const [error, setError] = useState();
  const [maxBalance, setMaxBalance] = useState(0);
  const handleTransfer = (e) => {
    const { name, value, type } = e.target;
    const data = { ...transfer };
    data[name] = type === 'number' ? Number(value) : value;
    if (name === 'from_terminal_id') {
      const selectedTerminal = terminalBalances.find((terminal) => terminal.terminal_id === Number(value));
      if (selectedTerminal) {
        setMaxBalance(selectedTerminal.balance);
      } else {
        setMaxBalance(0);
      }
    }
    setTransfer(data);
  };
  const submit = (e) => {
    e.preventDefault();
    if (
      transfer.from_terminal_id.length &&
      transfer.to_terminal_id.length &&
      transfer.from_terminal_id === transfer.to_terminal_id
    ) {
      setError('"From" and "To" terminals can not be same.');
    } else {
      setError('');
      handleSubmit();
    }
  };

  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      <div>
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack">Balance Transfer</h1>
        <form onSubmit={submit}>
          <SelectOption
            className="size-full"
            name="from_terminal_id"
            label="From"
            onChange={(e) => handleTransfer(e)}
            value={transfer.from_terminal_id}
            placeholder="Select one"
            labelClass="font-normal"
            options={allTerminals}
            optionLabel="terminal_name"
            optionValue="terminal_id"
            required
          />
          <SelectOption
            className="size-full"
            name="to_terminal_id"
            label="To"
            onChange={(e) => handleTransfer(e)}
            value={transfer.to_terminal_id}
            placeholder="Select one"
            labelClass="font-normal"
            options={allTerminals}
            optionLabel="terminal_name"
            optionValue="terminal_id"
            required
          />
          <InputField
            className="size-full "
            type="number"
            name="amount"
            label="Amount"
            onChange={(e) => handleTransfer(e)}
            value={transfer.amount}
            placeholder={`Max: ${maxBalance}`}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            max={maxBalance}
            required
          />
          <label className="mb-2 block text-sm font-normal text-gray-700">Date</label>
          <div className="custom-border mb-2 w-full py-1">
            <DatePicker
              showIcon
              selected={transfer.date}
              onChange={(date) => setTransfer({ ...transfer, date })}
              className="ml-2 font-normal text-pBlack"
              dateFormat={'dd/MM/yyyy'}
              placeholderText={'placeholderText'}
            />
          </div>
          <InputField
            className="size-full "
            type="text"
            name="description"
            label="Description"
            onChange={(e) => handleTransfer(e)}
            value={transfer.description}
            placeholder="Enter description (optional)"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
          />
          {error && <p className="my-2 rounded-lg bg-red-100 p-2">{error}</p>}
          <Button type="submit" className="flex w-full justify-center" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default TransferModal;
