'use client';

import React from 'react';
import Modal from '@/components/fields/Modal';
import TextLoader from '@/components/fields/TextLoader';

const TerminalsModal = ({ modalOpen, setModalOpen, allTerminals, loading }) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 shadow-xl shadow-black/40'}
    >
      {loading ? (
        <div className="flex justify-center">
          <TextLoader />
        </div>
      ) : (
        <div className="mx-auto rounded-md p-2 text-sBlack">
          <h3 className="text-md mb-4 font-semibold text-pGray">Terminals - where you store your income</h3>
          <div className="flex flex-col items-start gap-x-2">
            {allTerminals?.map((terminal, index) => (
              <li key={index} className="capitalize">
                {terminal.terminal_name}
              </li>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TerminalsModal;
