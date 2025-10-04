import React from 'react';
import TextLoader from '@/components/fields/TextLoader';
import Modal from '@/components/fields/Modal';

const DetailsModal = ({ loading, modalOpen, setModalOpen, title, data = [] }) => {
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
        <>
          <h3 className="mb-4 border-b pb-2 text-center text-lg font-semibold">{title || 'Details'}</h3>

          <div className="space-y-3">
            {data?.length ? (
              data.map((item, index) => (
                <div key={index} className="flex">
                  <span className="w-1/3 font-medium text-gray-700">{item.label}</span>
                  <span className="w-2/3 text-gray-600">: {item.value}</span>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default DetailsModal;
