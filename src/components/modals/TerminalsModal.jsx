'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@/components/fields/Modal';
import TextLoader from '@/components/fields/TextLoader';
import { getDate } from '@/helpers/frontend/formateDate';
import EditIcon from '@/assets/svg/Icon/EditIcon';
import InputField from '@/components/fields/Input';
import { EDIT_TERMINAL_URL } from '@/helpers/frontend/apiEndpoints';
import { notification } from '@/components/notification';

const TerminalsModal = ({
  modalOpen,
  setModalOpen,
  allTerminals,
  fetchTerminal,
  fetchDistributedIn,
  loading,
}) => {
  const [showEditForm, setShowEditForm] = useState({});
  const [terminalName, setTerminalName] = useState('');
  const [editLoading, setEditLoading] = useState(false);

  const handleEdit = (index) => {
    setTerminalName('');
    setShowEditForm({ [index]: !showEditForm[index] });
  };

  const editTerminal = async (term) => {
    setEditLoading(true);
    const payload = {
      terminal_id: term.terminal_id,
      terminal_name: terminalName,
      updated_at: new Date(),
    };
    const res = await axios.put(EDIT_TERMINAL_URL, payload);
    if (res.data.success) {
      fetchTerminal('force');
      fetchDistributedIn();
      notification(res.data.msg, { type: 'success', id: 'editTerminal' });
      setShowEditForm({});
      setTerminalName('');
    } else {
      notification(res.data.msg || 'Failed to edit terminal', { type: 'error', id: 'editTerminal' });
    }
    setEditLoading(false);
  };
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
        <div className="mx-auto rounded-md p-2 text-pBlack">
          <h3 className="mb-4 text-center text-sm font-semibold text-finance-ink md:text-base">
            Terminals - where you store your income
          </h3>
          <div className="rounded-xl border border-finance-border text-sm md:text-base">
            <div className="flex w-full flex-col">
              <div className="flex bg-finance-panel font-medium text-pBlack">
                <div className="w-2/4 py-2 pl-2 capitalize">Wallet</div>
                <div className="w-1/4 py-2 pl-2 capitalize">Created</div>
                <div className="w-1/4 py-2 pl-2 text-center capitalize">Action</div>
              </div>
              {allTerminals.map((term, index) => {
                return (
                  <div key={index} className="flex text-sm text-pGray">
                    {showEditForm[index] ? (
                      <div className="flex w-2/4 items-center gap-x-1 border-t py-1 pl-2">
                        <InputField
                          className="!mb-0 max-h-6 max-w-[100px]"
                          type="text"
                          onChange={(e) => setTerminalName(e.target.value)}
                          value={terminalName}
                          placeholder={term.terminal_name}
                          inputClass="h-6 !border-pRed/40 capitalize px-1"
                        />
                        <button
                          onClick={() => editTerminal(term)}
                          disabled={editLoading || !terminalName.length}
                          className="rounded-md bg-pest px-1 py-0.5 text-xs text-white disabled:opacity-40"
                        >
                          save
                        </button>
                      </div>
                    ) : (
                      <div className="flex w-2/4 items-center gap-x-1 border-t py-1 pl-2 capitalize">
                        {term.terminal_name}
                        {term.default_terminal ? (
                          <div className="flex h-[14px] items-center rounded-sm bg-pest px-[5px] text-[9px] text-gray-200">
                            Default
                          </div>
                        ) : null}
                      </div>
                    )}
                    <div className="w-1/4 border-t py-1 pl-2">{getDate(term.created_at)}</div>
                    <div className="w-1/4 border-t py-1 pl-2 text-center">
                      <button onClick={() => handleEdit(index)}>
                        <EditIcon className={`h-5 ${showEditForm[index] ? '!bg-pRed-200' : ''}`} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default TerminalsModal;
