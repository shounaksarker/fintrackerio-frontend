import { getDate } from '@/helpers/frontend/formateDate';
import Expencces from '../svg/Icon/Expencces';
import Income from '../svg/Icon/Income';
import Overview from '../svg/Icon/Overview';
import Settings from '../svg/Icon/Settings';
import dateRangeIcon from '@/assets/images/dateRangeimg.png';
import btnsImg from '@/assets/images/3buttonimg.png';
import createExpenseImg from '@/assets/images/expenseRecord.png';
import incomeRecordImg from '@/assets/images/incomeRecordimg.png';
import ManualIcon from '../svg/Icon/ManualIcon';
import { formattedAmount } from '@/helpers/frontend/getSum';

export const CURRENCY = '৳';
export const TOKEN = 'token';
export const USER = 'user';
export const TOKEN_EXPIRED_DAY = 3;

export const SIDEBAR_MENU = [
  { title: 'Overview', path: '/', icon: <Overview /> },
  {
    title: 'Income',
    submenu: [
      { title: 'Income Source', path: '/income/source' },
      { title: 'Income Record', path: '/income/record' },
      { title: 'Transfer History', path: '/income/transfer-history' },
    ],
    icon: <Income />,
  },
  {
    title: 'Expense',
    submenu: [
      { title: 'Expense Category', path: '/expense/category' },
      { title: 'Expense Record', path: '/expense/record' },
      { title: 'Breakdown', path: '/expense/breakdown' },
    ],
    icon: <Expencces />,
  },
  { title: 'Settings', path: '/setting', icon: <Settings /> },
  { title: 'User Manual', path: '/user-manual', icon: <ManualIcon /> },
];

export const INCOME_RECORDS_TABLE_HEADER = [
  {
    label: 'Name',
    style: 'w-24 md:w-1/4 text-sm lg:text-md capitalize',
    target: 'income_category_name',
    dynamicIcon: 'icon',
  },
  {
    label: 'Amount',
    style: 'w-24 md:w-1/4 text-sm lg:text-md',
    target: 'amount',
    function: formattedAmount,
  },
  {
    label: 'Date',
    style: 'w-24 md:w-1/4 text-sm lg:text-md',
    target: 'date',
    function: getDate,
  },
  {
    label: 'Description',
    style: 'w-24 md:w-1/4 md:pr-4 truncate text-sm lg:text-md',
    target: 'description',
    showInModal: true,
  },
  // {
  //   label: 'Action',
  //   style: 'w-24 md:w-1/4 text-sm lg:text-md',
  //   target: 'action',
  //   action: [
  //     { label: 'Edit', onClick: (row) => handleEdit(row), style: 'text-blue-500' },
  //     { label: 'Delete', onClick: (row) => handleDelete(row), style: 'text-pRed' },
  //   ],
  // },
];
export const INCOME_TRANSFER_TABLE_HEADER = [
  {
    label: 'Name',
    style: 'w-24 md:w-1/4 text-sm lg:text-md capitalize',
    target: 'terminal_name',
  },
  {
    label: 'Amount',
    style: 'w-24 md:w-1/4 text-sm lg:text-md',
    target: 'amount',
    function: formattedAmount,
    conditionalStyles: [
      {
        condition: (value) => value < 0,
        style: 'text-red-500',
      },
      {
        condition: (value) => value >= 0,
        style: 'text-green-600',
      },
    ],
  },
  {
    label: 'Date',
    style: 'w-24 md:w-1/4 text-sm lg:text-md',
    target: 'date',
    function: getDate,
  },
  {
    label: 'Description',
    style: 'w-24 capitalize md:w-1/4 md:pr-4 truncate text-sm lg:text-md',
    target: 'description',
    showInModal: true,
  },
];

export const EXPENSE_RECORDS_TABLE_HEADER = (arr = []) => [
  {
    label: 'Category',
    style: 'md:w-[20%] h-6 truncate text-sm lg:text-md capitalize',
    target: 'expense_category_name',
    dynamicIcon: 'icon',
  },
  {
    label: 'Spend On',
    style: 'max-w-[150px] xl:max-w-full md:w-[15%] h-6 truncate text-sm lg:text-md capitalize',
    target: 'spend_on',
    showInModal: true,
  },
  {
    label: 'Spend From',
    style: 'max-w-[150px] xl:max-w-full md:w-[15%] h-6 truncate text-sm lg:text-md capitalize',
    target: 'terminal_name',
  },
  {
    label: 'Amount',
    style: 'max-w-[150px] xl:max-w-full md:w-[15%] h-6 text-sm lg:text-md',
    target: 'amount',
    function: formattedAmount,
  },
  {
    label: 'Date',
    style: 'max-w-[150px] xl:max-w-full md:w-[15%] h-6 text-sm lg:text-md',
    target: 'date',
    function: getDate,
  },
  {
    label: 'Description',
    style: 'max-w-[150px] xl:max-w-full md:w-[15%] h-6 truncate text-sm lg:text-md',
    target: 'description',
    showInModal: true,
  },
  ...arr,
];

export const TERMINALS_TABLE_HEADER = [
  {
    label: 'Terminal',
    style: 'w-24 md:w-3/4 text-sm lg:text-md capitalize truncate',
    target: 'terminal_name',
    conditionalStyles: [
      {
        condition: (value) => value,
        style: 'md:text-sm lg:text-sm',
      },
    ],
  },
  {
    label: 'Created at',
    style: 'w-24 md:w-1/4 text-sm lg:text-md md:text-end',
    target: 'created_at',
    function: getDate,
    conditionalStyles: [
      {
        condition: (value) => value,
        style: 'md:text-sm lg:text-sm',
      },
    ],
  },
  // {
  //   label: 'Action',
  //   style: 'w-24 md:w-1/4 text-sm lg:text-md',
  //   target: 'action',
  //   action: [
  //     { label: 'Edit', onClick: (row) => handleEdit(row), style: 'text-blue-500' },
  //     { label: 'Delete', onClick: (row) => handleDelete(row), style: 'text-pRed' },
  //   ],
  // },
];

export const BALANCE_TITLE = {
  INCOME: 'Income',
  EXPENSE: 'Expense',
  REMAIN: 'Remain',
  IN: 'In',
  OUT: 'Out',
};

export const PASSWORD_CRITERIA_VALUE = {
  length: {
    perfect: false,
    text: '8 characters',
  },
  uppercase: {
    perfect: false,
    text: '1 uppercase',
  },
  lowercase: {
    perfect: false,
    text: '1 lowercase',
  },
  number: {
    perfect: false,
    text: '1 number',
  },
  specialChar: {
    perfect: false,
    text: '1 specal character',
  },
};

export const GENERAL_MANUALS = {
  name: {
    en: 'General Summary',
    bn: 'সাধারণ সারসংক্ষেপ',
  },
  instruction: [
    {
      bn: 'ডিফল্ট ভাবে এটি বর্তমান মাসের ডেটা দেখাবে।',
      en: "by default it will show current month's data",
    },
    {
      bn: 'ডেটরেঞ্জ (যেমন: ০১/০১/২০২৪ - ৩০/০১/২০২৪) সিলেক্ট করে ওই তারিখের সব ডেটা দেখা যাবে। এবং ক্রস আইকনে ক্লিক করে ডেটরেঞ্জ & ডেটা আবার রিসেট করা যাবে।',
      en: 'Select the date range (ie: 01/01/2024 - 30/01/2024) to view all the data for that date-range. And the date-range can be reset again by clicking on the cross icon.',
      img: dateRangeIcon,
    },
    {
      bn: 'ডেটরেঞ্জ  সিলেক্ট থাকা অবস্থায় প্রতিটি সেকশন ও পেজে সিলেক্টেড ডেটরেঞ্জের ডেটা দেখা যাবে।',
      en: 'While the date-range is selected, you will see the data of the selected date-range in each section and page.',
    },
    {
      bn: 'কোনো ডেটা ইনপুট দেয়ার সময় যে তারিখ(মাস) সিলেক্ট করবেন, সেই মাসের হিসাবে সেই ডেটা ইনপুট হবে। যেমন: আপনি ১০ ফেব্রুয়ারি,২০২৪ তারিখে "৫/১/২৪" তারিখ সিলেক্ট করে কোনো ডেটা ইনপুট দিলে সেটি জানুয়ারির হিসাবে ইনপুট হবে। সেই ডেটা দেখতে আপনাকে ডেট রেঞ্জ থেকে জানুয়ারির তারিখ সিলেক্ট করতে হবে (৫/১/২০২৪- ৬/১/২০২৪)।',
      en: 'The date (month) you select while inputting any data, the data will be input as of that month. Eg: If you input any data on February 10, 2024 and select "5/1/2024", it will be input as data of January. To view that data you need to select the January date from the date-range (5/1/2024 - 6/1/2024).',
    },
    {
      bn: 'ইনকাম & এক্সপেন্স রেকর্ড সাবধানে ইনপুট করতে হবে, কারণ রেকর্ড ইডিটের সুযোগ নেই।',
      en: 'Income & Expense records have to be input carefully, as there is no facility to edit records.',
    },
    {
      bn: 'Income, Expense, Remain - এই ৩টি বাটনে ক্লিক করে এদের ডিটেলস দেখতে পারবেন।',
      en: 'Income, Expense, Remain - You can see their details by clicking on these 3 buttons.',
      img: btnsImg,
    },
  ],
};

export const USER_MANUALS = {
  name: {
    bn: 'ব্যবহার বিধি',
    en: 'User Manual',
  },
  instruction: [
    {
      bn: 'প্রথমে Income > "ইনকাম সোর্স (Income Source)" তৈরি করুন।',
      en: 'First, create an "Income Source" (From: Income > Income Source).',
    },
    {
      bn: 'Income > "ইনকাম রেকর্ড"-এ গিয়ে "Add Income" বাটনে ক্লিক করে ইনকাম-ডেটা ইনপুট দিন। ',
      en: 'Go to Income > "Income Record" then click on "Add Income" button and input income data.',
      img: incomeRecordImg,
    },
    {
      bn: 'Create Terminal-এ ক্লিক করে আপনি কিছু টার্মিনাল তৈরি করে নিতে পারেন। যেমন: বিকাশ, কার্ড বা আপনি যেখানে টাকা জমা রাখেন। এটি অপশনাল। যদি টারর্মিনাল তৈরি না করেন, তাহলে ডিফল্ট ভাবে তৈরিকৃত টারর্মিনাল (পকেট) থেকেই সব কার্যক্রম চলবে।',
      en: `You can create some terminals by clicking "Create Terminal". For example: Bkash, Card or where you store money. This is optional. If you don't create a terminal, all operations will run from the terminal (pocket) created by default.`,
    },
    {
      bn: 'Show Terminal-এ ক্লিক করে আপনার তৈরিকৃত টার্মিনাল গুলো দেখতে পারবেন। ',
      en: 'You can see the terminals you have created by clicking "Show Terminal".',
    },
    {
      bn: 'Balance Transfer-এ ক্লিক করে এক টার্মিনাল থেকে আরেক টার্মিনালে ব্যালেন্স ট্রান্সফার করতে পারবেন। যেমন: পকেট থেকে বিকাশে টাকা ট্রান্সফার।',
      en: 'You can transfer balance from one terminal to another terminal by clicking on balance transfer. Eg: Money Transfer from Pocket to Bkash',
    },
    {
      bn: 'এরপর Expense > "এক্সপেন্স ক্যাটাগরি (Expense Category)" তৈরি করুন।',
      en: 'Next, create an "Income Source". (From: Expense > Expense Category)',
    },
    {
      bn: 'Expense > "এক্সপেন্স রেকর্ড"-এ গিয়ে "Add Expesne" বাটনে ক্লিক করে এক্সপেন্স-ডেটা ইনপুট দিন।',
      en: 'Go to Expense > "Expense Record" then click on "Add Expense" button and input expense data.',
    },
    {
      bn: 'নোট: "ক্যাটাগরি (category)" এবং "স্পেন্ড-ফর (spend for)" আলাদা & আবশ্যক। যেমন: ক্যাটাগরি: ফুড এবং স্পেন্ড-ফর: বার্গার/অনলাইন অর্ডার/রেগুলার বাজার।',
      en: 'Reminder: "Category" and "Spend For" are different & required. Eg: "Category" = Food & "Spend For" = Burger/Online Order/Regular bazar.',
      img: createExpenseImg,
    },
    {
      bn: 'Expense > ব্রেকডাউন-এ মাসের কোন তারিখ কত খরচ হয়েছে এবং আগের মাসের কোন তারিখ কত খরচ হয়েছে তার গ্রাফ পাওয়া যাবে। সেই সাথে কোন ক্যাটাগরিতে টোটাল কত খরচ হয়েছে তার বিস্তারিতও পাওয়া যাবে।',
      en: 'Expense > Breakdown provides graphs of expenses for any date of the month and for any date of the previous month. Along with that, the details of the total cost in any category can also be found.',
    },
    {
      bn: 'সর্বশেষে, ওভারভিউ-তে এসে কত ইনকাম, কত খরচ এবং কোন টারর্মিনাল থেকে কত খরচ হয়েছে, কোন টারর্মিনালে কত আছে তা জানা যাবে। সেই সাথে সারা বছরের মাস ভিত্তিক ইনকাম, খরচ, জমা সব কিছুর গ্রাফ ও পাওয়া যাবে।',
      en: 'Finally, come to the "Overview" to know how much income, how much expenses and how much has been spent from which terminal, how much is in which terminal. Along with that, the graph of all month wise income, expenses, deposits of the whole year will also be available.',
    },
  ],
};
