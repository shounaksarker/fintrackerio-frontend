import React from 'react';
import TextLoader from '@/components/fields/TextLoader';
import Modal from '@/components/fields/Modal';

const DetailsModal = ({ loading, modalOpen, setModalOpen, title, data }) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 text-sBlack shadow-xl shadow-black/40'}
    >
      {loading ? (
        <div className="flex justify-center">
          <TextLoader />
        </div>
      ) : (
        <div className="mx-auto rounded-md p-2">
          <h3 className="mb-4 text-center text-lg font-semibold capitalize text-pGray">{title}</h3>
          <div className="flex flex-col items-start gap-x-2 capitalize">{data}</div>
        </div>
      )}
    </Modal>
  );
};

export default DetailsModal;
