'use client';

import React from 'react';
import Modal from '@/components/fields/Modal';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';

const CreateTerminalModal = ({
  modalOpen,
  setModalOpen,
  loading,
  terminalName,
  setTerminalName,
  handleSubmit,
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack">Create New Terminal</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            className="w-full"
            type="text"
            name="terminal_name"
            label="Terminal Name"
            onChange={(e) => setTerminalName(e.target.value)}
            value={terminalName}
            placeholder="Enter description"
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            required
          />
          <Button type="submit" className="flex w-full justify-center" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateTerminalModal;
