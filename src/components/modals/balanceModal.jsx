import React from 'react';
import TextLoader from '@/components/fields/TextLoader';
import Modal from '@/components/fields/Modal';
import { BALANCE_TITLE } from '@/assets/constants';
import { formattedAmount } from '@/helpers/frontend/getSum';

const BalanceModal = ({ loading, modalOpen, setModalOpen, data }) => {
  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      showCloseButton
      className={'mx-2 max-w-2xl p-6 text-sBlack shadow-xl shadow-black/40'}
    >
      {!data.balance.terminal || loading ? (
        <div className="flex justify-center">
          <TextLoader />
        </div>
      ) : (
        <>
          <h5 className="mb-2 w-full text-center font-semibold text-pest-200 underline underline-offset-4">
            Balance
          </h5>
          <div className="flex rounded-md border border-bGray text-xs md:text-base">
            <div className="flex w-2/5 flex-col border-r">
              <div className="py-1 pl-2 font-bold text-black">Terminal</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="border-t py-1 pl-2 font-bold capitalize italic">
                    {term.terminal_name}
                  </div>
                );
              })}
              <div className="border-t py-1 pl-2 font-bold text-pest-200">Total</div>
            </div>
            <div
              className={`flex w-1/5 flex-col border-r ${data.title === BALANCE_TITLE.INCOME ? 'text-pBlack' : 'text-sBlack/50'}`}
            >
              <div className="py-1 pl-2 font-bold">{BALANCE_TITLE.IN}</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="overflow-x-auto border-t py-1 pl-2">
                    {formattedAmount(term.total_in)}
                  </div>
                );
              })}
              <div
                className={`overflow-x-auto border-t py-1 pl-2 ${data.title === BALANCE_TITLE.INCOME ? 'text-pest-200' : 'text-sBlack/50'}`}
              >
                {formattedAmount(data.balance.total_income)}
              </div>
            </div>
            <div
              className={`flex w-1/5 flex-col border-r ${data.title === BALANCE_TITLE.EXPENSE ? 'text-pBlack' : 'text-sBlack/50'}`}
            >
              <div className="py-1 pl-2 font-bold">{BALANCE_TITLE.OUT}</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="overflow-x-auto border-t py-1 pl-2">
                    {formattedAmount(term.total_out)}
                  </div>
                );
              })}
              <div
                className={`overflow-x-auto border-t py-1 pl-2 ${data.title === BALANCE_TITLE.EXPENSE ? 'text-pest-200' : 'text-sBlack/50'}`}
              >
                {formattedAmount(data.balance.total_expense)}
              </div>
            </div>
            <div
              className={`flex w-1/5 flex-col ${data.title === BALANCE_TITLE.REMAIN ? 'text-pBlack' : 'text-sBlack/50'}`}
            >
              <div className="py-1 pl-2 font-bold">{BALANCE_TITLE.REMAIN}</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="overflow-x-auto border-t py-1 pl-2">
                    {formattedAmount(term.balance)}
                  </div>
                );
              })}
              <div
                className={`overflow-x-auto border-t py-1 pl-2 ${data.title === BALANCE_TITLE.REMAIN ? 'text-pest-200' : 'text-sBlack/50'}`}
              >
                {formattedAmount(data.balance.remain)}
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default BalanceModal;
