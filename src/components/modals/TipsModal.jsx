'use client';

import React, { useState } from 'react';
import Modal from '@/components/fields/Modal';

const TipsModal = ({ modalOpen, setModalOpen }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'bn' : 'en'));
  };

  const content = {
    en: {
      title: 'Feature Explanation',
      description: `This feature helps you transfer any remaining balance from last month to this month’s income. For example, if you had a $250 balance left last month, you can use this setting to add that $250 to this month’s income. If this month’s income is $700, it will become $700 + $250 = $950.`,
      tipsTitle: 'Tips for Using This Feature',
      tips: [
        'To use this feature, you need to set up two categories. If you don’t have them already, please create two new categories.',
        'One category will be used to record the remaining balance from the previous month as an expense in that month. For example, Category = Send to Next Month. If you have $100 left in January, that $100 will be recorded as an expense under the category "Send to Next Month" in January.',
        'Another category will be used to add the previous month’s remaining balance to the current month’s income. For example, Category = Remaining from Previous Month. In February, that $100 will be added to income under the category "Remaining from Previous Month."',
        'Note: The remaining amounts will be added to the specific accounts or wallets they came from. For instance, if you had $30 in cash and $70 in the bank last month, then $30 will be added to cash and $70 to the bank this month.',
      ],
    },
    bn: {
      title: 'ফিচার',
      description: `এই ফিচারটি ব্যবহার করে, আপনি আগের মাসের বাকি থাকা অর্থ বর্তমান মাসের আয়ে যোগ করতে পারেন। উদাহরণস্বরূপ, যদি আগের মাসে ৳250 বাকি থাকে, তাহলে এই সেটিংস ব্যবহার করে সেই ৳250 বর্তমান মাসের আয়ের সাথে যোগ করা যাবে। যেমন, বর্তমান মাসের আয় ৳700 হলে, এটি ৳700 + ৳250 = ৳950 হবে।`,
      tipsTitle: 'ফিচারটি ব্যবহারের টিপস',
      tips: [
        'এই ফিচারটি ব্যবহার করতে দুটি ক্যাটাগরি সেটআপ করা প্রয়োজন। যদি আগে থেকে কোনো ক্যাটাগরি তৈরি না থাকে, তাহলে অনুগ্রহ করে নতুন দুটি ক্যাটাগরি তৈরি করুন।',
        'একটি ক্যাটাগরি, যেখানে আগের মাসের অবশিষ্ট ব্যালেন্সকে সেই মাসের ব্যয় হিসেবে যোগ করা হবে। যেমন: ক্যাটাগরি = Send to next month. জানুয়ারিতে ৳১০০ টাকা অবশিষ্ট থাকলে সেই ৳১০০ টাকা জানুয়ারির খরচ হিসেবে Send to next month ক্যাটাগরি তে যুক্ত হবে',
        'আরেকটি ক্যাটাগরি, যেখানে বর্তমান মাসের আয়ের সাথে আগের মাসের ব্যালেন্স যোগ হবে। যেমন: ক্যাটাগরি = Remaining of Previous Month,  ফেব্রুয়ারিতে সেই ৳১০০ টাকা ফেব্রুয়ারির ইনকাম হিসেবে Remaining of Previous Month ক্যাটাগরি তে যুক্ত হবে',
        'বি:দ্র: যে যে টারর্মিনালের এমাউন্ট সেই সেই টারর্মিনালেই জমা হবে। যেমন: গত মাসে পকেটে ৳৩০, ব্যাংকে ৳৭০ থাকলে, এই মাসের পকেটে ৳৩০ এবং ব্যাংকে ৳৭০ জমা হবে।',
      ],
    },
  };

  const currentContent = content[language];

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
