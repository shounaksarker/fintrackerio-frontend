'use client';

import React, { useState } from 'react';
import Modal from '@/components/fields/Modal';
import { AUTO_TRANSFER_MANUALS } from '@/assets/constants';

const TipsModal = ({ modalOpen, setModalOpen }) => {
  const [language, setLanguage] = useState('bn');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'bn' : 'en'));
  };

  const currentContent = AUTO_TRANSFER_MANUALS[language];

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen} className={'mx-2 p-6 shadow-xl  shadow-black/40'}>
      <div className="scrollbar-hidden max-h-[80vh] overflow-y-scroll text-sBlack">
        <div className="my-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">{currentContent.title}:</h2>
          <button
            onClick={toggleLanguage}
            className="rounded-sm border border-pest-200 bg-pest px-1 text-sm text-white"
          >
            {language === 'en' ? 'বাংলায় পড়ুন' : 'Read in English'}
          </button>
        </div>
        <p>{currentContent.description}</p>
        <h3 className="mb-2 mt-4 text-lg font-semibold text-black">{currentContent.tipsTitle}:</h3>
        <ul className="flex list-decimal flex-col gap-y-2 pl-1 text-justify">
          {currentContent.tips.map((tip, index) => (
            <li key={index}>
              {index + 1}. {tip}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setModalOpen(false)}
          className="mt-4 w-full rounded border border-pest-200 bg-pest p-1 text-white"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default TipsModal;
