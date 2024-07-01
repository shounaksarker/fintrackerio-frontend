import React from 'react';
import TextLoader from '@/components/fields/TextLoader';
import Modal from '@/components/fields/Modal';

const BalanceModal = ({ loading, modalOpen, setModalOpen, title, data }) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 p-6 text-sBlack shadow-xl shadow-black/40'}
    >
      {!data.balance.terminal || loading ? (
        <div className="flex justify-center">
          <TextLoader />
        </div>
      ) : (
        <div className="mx-auto rounded-md p-2">
          <h3 className="mb-4 text-center text-lg font-semibold text-pest">{title || data.title || ''}</h3>
          <ul className="flex flex-col items-start gap-y-2">
            {data.balance.terminal.map((info, i) => {
              return (
                <li key={i} className="italic">
                  <span className="font-semibold capitalize">{info[data.target_key]}</span> :{' '}
                  {Number(info[data.target_value]).toFixed(1)}
                </li>
              );
            })}
          </ul>
          <div className="mt-2 w-full border-t-2 pt-1 font-bold italic text-pRed">
            <span className="capitalize">Total</span> : <span>{Number(data.balance[data.target_total]).toFixed(1)}</span>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BalanceModal;
