import React from 'react';
import Modal from '@/components/fields/Modal';
import Button from '@/components/fields/Button';

const ConfirmModal = ({ modalOpen, setModalOpen, title, loading, handleSubmit }) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      <div className="text-sBlack">
        <h1 className="mb-8 text-center text-lg font-semibold text-pBlack">{title}</h1>
        <div className="flex items-center gap-x-3">
          <Button
            size="small"
            className="flex w-full justify-center"
            loading={loading}
            onClick={handleSubmit}
          >
            Yes
          </Button>
          <Button
            size="small"
            color="danger"
            className="flex w-full justify-center"
            disabled={loading}
            onClick={() => setModalOpen(false)}
          >
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
