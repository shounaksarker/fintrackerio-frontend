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
      className={'mx-2 max-w-2xl !bg-white p-6 text-finance-ink shadow-card'}
    >
      {!data.balance.terminal || loading ? (
        <div className="flex justify-center">
          <TextLoader />
        </div>
      ) : (
        <>
          <h5 className="mb-4 w-full text-center text-lg font-bold text-finance-ink">Balance</h5>
          <div className="flex overflow-hidden rounded-xl border border-finance-border bg-white text-xs shadow-soft md:text-base">
            <div className="flex w-2/5 flex-col border-r border-finance-border">
              <div className="bg-finance-panel p-2 font-bold text-finance-ink">Terminal</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="border-t border-finance-border p-2 font-semibold capitalize">
                    {term.terminal_name}
                  </div>
                );
              })}
              <div className="border-t border-finance-border bg-finance-panel p-2 font-bold text-pest-200">
                Total
              </div>
            </div>
            <div
              className={`flex w-1/5 flex-col border-r border-finance-border ${data.title === BALANCE_TITLE.INCOME ? 'text-finance-ink' : 'text-finance-muted/60'}`}
            >
              <div className="bg-finance-panel p-2 font-bold">{BALANCE_TITLE.IN}</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="overflow-x-auto border-t border-finance-border p-2">
                    {formattedAmount(term.total_in)}
                  </div>
                );
              })}
              <div
                className={`overflow-x-auto border-t border-finance-border bg-finance-panel p-2 font-bold ${data.title === BALANCE_TITLE.INCOME ? 'text-pest-200' : 'text-finance-muted/60'}`}
              >
                {formattedAmount(data.balance.total_income)}
              </div>
            </div>
            <div
              className={`flex w-1/5 flex-col border-r border-finance-border ${data.title === BALANCE_TITLE.EXPENSE ? 'text-finance-ink' : 'text-finance-muted/60'}`}
            >
              <div className="bg-finance-panel p-2 font-bold">{BALANCE_TITLE.OUT}</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="overflow-x-auto border-t border-finance-border p-2">
                    {formattedAmount(term.total_out)}
                  </div>
                );
              })}
              <div
                className={`overflow-x-auto border-t border-finance-border bg-finance-panel p-2 font-bold ${data.title === BALANCE_TITLE.EXPENSE ? 'text-pest-200' : 'text-finance-muted/60'}`}
              >
                {formattedAmount(data.balance.total_expense)}
              </div>
            </div>
            <div
              className={`flex w-1/5 flex-col ${data.title === BALANCE_TITLE.REMAIN ? 'text-finance-ink' : 'text-finance-muted/60'}`}
            >
              <div className="bg-finance-panel p-2 font-bold">{BALANCE_TITLE.REMAIN}</div>
              {data.balance.terminal.map((term, i) => {
                return (
                  <div key={i} className="overflow-x-auto border-t border-finance-border p-2">
                    {formattedAmount(term.balance)}
                  </div>
                );
              })}
              <div
                className={`overflow-x-auto border-t border-finance-border bg-finance-panel p-2 font-bold ${data.title === BALANCE_TITLE.REMAIN ? 'text-pest-200' : 'text-finance-muted/60'}`}
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
