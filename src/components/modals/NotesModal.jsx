'use client';

import React from 'react';
import Modal from '@/components/fields/Modal';
import InputField from '@/components/fields/Input';
import Button from '@/components/fields/Button';
import Textarea from '@/components/fields/TextArea';

const NotesModal = ({ modalOpen, setModalOpen, heading, loading, info, setInfo, handleSubmit }) => {
  const handleExpense = (e) => {
    const { name, value } = e.target;
    const data = { ...info };
    data[name] = value;
    setInfo(data);
  };
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl  shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack underline underline-offset-4">
          {heading}
        </h1>
        <form onSubmit={handleSubmit}>
          <InputField
            className="size-full "
            type="text"
            name="title"
            label="Title"
            onChange={(e) => handleExpense(e)}
            value={info.title}
            placeholder={'Title...'}
            labelClass="font-normal"
            inputClass="placeholder:text-xs border-2"
            required
          />
          <Textarea
            name="description"
            label="Description"
            onChange={(e) => handleExpense(e)}
            value={info.description}
            placeholder="Description..."
            labelClass="font-normal"
            textareaClass="placeholder:text-xs border-2"
            required
            rows={6}
          />
          <Button
            type="submit"
            className="flex w-full justify-center"
            loading={loading}
            loadingText="Processing..."
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default NotesModal;
