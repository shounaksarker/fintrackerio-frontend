import { getDate } from '@/helpers/frontend/formateDate';
import Expencces from '@/assets/svg/Icon/Expencces';
import Income from '@/assets/svg/Icon/Income';
import Overview from '@/assets/svg/Icon/Overview';
import Settings from '@/assets/svg/Icon/Settings';
import dateRangeIcon from '@/assets/images/dateRangeimg.png';
import btnsImg from '@/assets/images/3buttonimg.png';
import createExpenseImg from '@/assets/images/expenseRecord.png';
import incomeRecordImg from '@/assets/images/incomeRecordimg.png';
import dashboardOverviewImg from '@/assets/images/dashboardOverview.png';
import incomeSourceImg from '@/assets/images/incomeSourcePage.png';
import expenseCategoryImg from '@/assets/images/expenseCategoryPage.png';
import expenseBreakdownImg from '@/assets/images/expenseBreakdownPage.png';
import recurringImg from '@/assets/images/recurringPage.png';
import notesImg from '@/assets/images/notesPage.png';
import settingsImg from '@/assets/images/settingsPage.png';
import ManualIcon from '@/assets/svg/Icon/ManualIcon';
import { formattedAmount } from '@/helpers/frontend/getSum';
import NotesIcon from '@/assets/svg/Icon/NotesIcon';
import RecurringIcon from '@/assets/svg/Icon/Recurring';
import SentryIcon from '@/assets/svg/Icon/SentryIcon';

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
  { title: 'Repeatative Hub', path: '/recurring', icon: <RecurringIcon /> },
  { title: 'Notes', path: '/notes', icon: <NotesIcon /> },
  { title: 'Settings', path: '/setting', icon: <Settings /> },
  { title: 'User Manual', path: '/user-manual', icon: <ManualIcon /> },
  { title: 'Error Tracking', path: '/sentry', icon: <SentryIcon />, adminOnly: true },
];

export const INCOME_RECORDS_TABLE_HEADER = (arr = []) => [
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
  },
  ...arr,
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
    en: 'Important Tips',
    bn: 'গুরুত্বপূর্ণ টিপস',
  },
  instruction: [
    {
      en: 'By default, the app shows the current month\'s data. You can use the "Select Date Range" button (top-right corner) to see data from any time period. Click the ✕ icon to reset back to the current month.',
      bn: 'অ্যাপটি সাধারণত বর্তমান মাসের ডেটা দেখায়। উপরের ডান কোণায় "Select Date Range" বাটন ব্যবহার করে যেকোনো সময়ের ডেটা দেখতে পারবেন। আবার বর্তমান মাসে ফিরে আসতে ✕ আইকনে ক্লিক করুন।',
      img: dateRangeIcon,
    },
    {
      en: 'When the date range is active, ALL pages (Income, Expense, Breakdown, etc.) will filter data by that range. Example: Select "01/01/2026 - 31/01/2026" to see only January data.',
      bn: 'ডেট রেঞ্জ সক্রিয় থাকলে সব পেজেই (ইনকাম, এক্সপেন্স, ব্রেকডাউন ইত্যাদি) সেই রেঞ্জের ডেটা দেখাবে। উদাহরণ: "০১/০১/২০২৬ - ৩১/০১/২০২৬" সিলেক্ট করলে শুধু জানুয়ারির ডেটা দেখাবে।',
    },
    {
      en: "When you add income or expense, the DATE you pick decides which month it belongs to. Example: If today is March 10 but you pick January 5 as the date, the data will go to January's record. To see it, use the date range to view January.",
      bn: 'ইনকাম বা এক্সপেন্স যোগ করার সময় আপনি যে তারিখ সিলেক্ট করবেন, ডেটা সেই মাসে যাবে। উদাহরণ: আজ ১০ মার্চ কিন্তু তারিখ ৫ জানুয়ারি দিলে, ডেটা জানুয়ারিতে যাবে। দেখতে হলে ডেট রেঞ্জ থেকে জানুয়ারি সিলেক্ট করুন।',
    },
    {
      en: 'The three colored buttons at the top — Income (green), Expense (red), Remain (blue) — show the totals. Click any of them to see the detailed breakdown of that section.',
      bn: 'উপরের তিনটি রঙিন বাটন — ইনকাম (সবুজ), এক্সপেন্স (লাল), রিমেইন (নীল) — মোট টাকার পরিমাণ দেখায়। যেকোনো বাটনে ক্লিক করলে সেই সেকশনের বিস্তারিত দেখতে পারবেন।',
      img: btnsImg,
    },
    {
      en: 'You can edit and delete almost everything — income sources, expense categories, income records, expense records, notes, and terminal names. Just click the edit (✏️) or delete (🗑️) icon next to the item.',
      bn: 'আপনি প্রায় সবকিছু এডিট ও ডিলিট করতে পারবেন — ইনকাম সোর্স, এক্সপেন্স ক্যাটাগরি, ইনকাম রেকর্ড, এক্সপেন্স রেকর্ড, নোটস, এবং টার্মিনালের নাম। আইটেমের পাশে এডিট (✏️) বা ডিলিট (🗑️) আইকনে ক্লিক করুন।',
    },
    {
      en: 'The 🔔 bell icon at the top shows your notifications. You will get alerts for important events like recurring transactions being processed.',
      bn: 'উপরের 🔔 বেল আইকনে আপনার নোটিফিকেশন দেখতে পারবেন। গুরুত্বপূর্ণ ইভেন্ট যেমন রিকারিং ট্রান্সাকশন প্রসেস হলে এখানে অ্যালার্ট আসবে।',
    },
    {
      en: 'You can also click "Lifetime Records" (top-right) to see all data from every month combined, instead of just one month.',
      bn: 'উপরের ডানে "Lifetime Records" ক্লিক করে সব মাসের ডেটা একসাথে দেখতে পারবেন।',
    },
  ],
};

export const USER_MANUALS = {
  name: {
    bn: 'ব্যবহার বিধি',
    en: 'Step-by-Step Guide',
  },
  instruction: [
    {
      en: '🟢 Step 1: Create Income Source — Go to Income > Income Source. Click "+ Add Income Source". Give it a name (like "Job", "Freelance", "Tuition"), pick an emoji icon, and add a description if you want. This is WHERE your money comes from.',
      bn: '🟢 ধাপ ১: ইনকাম সোর্স তৈরি — Income > Income Source-এ যান। "+ Add Income Source" ক্লিক করুন। একটি নাম দিন (যেমন: "চাকরি", "ফ্রিল্যান্স", "টিউশন"), একটি ইমোজি আইকন বেছে নিন, চাইলে বর্ণনা দিন। এটি হলো আপনার টাকা কোথা থেকে আসে।',
      img: incomeSourceImg,
    },
    {
      en: '🟢 Step 2: Add Income Record — Go to Income > Income Record. Click "+ Add Income". Select your income source (e.g. "Job"), enter the amount (e.g. ৳30,000), pick a date, and add a description. This records HOW MUCH money you received.',
      bn: '🟢 ধাপ ২: ইনকাম রেকর্ড যোগ — Income > Income Record-এ যান। "+ Add Income" ক্লিক করুন। ইনকাম সোর্স সিলেক্ট করুন (যেমন: "চাকরি"), পরিমাণ লিখুন (যেমন: ৳৩০,০০০), তারিখ এবং বিবরণ দিন। এটি রেকর্ড করে আপনি কত টাকা পেয়েছেন।',
      img: incomeRecordImg,
    },
    {
      en: '🟢 Step 3: Create Terminals (optional) — From Income Record page, click "Create Terminal". Terminals are like your wallets/accounts — for example: "Pocket" (cash), "Bkash", "Bank", "Credit Card". By default, a "Pocket" terminal is already created. If you only use cash, you can skip this step.',
      bn: '🟢 ধাপ ৩: টার্মিনাল তৈরি (ঐচ্ছিক) — Income Record পেজ থেকে "Create Terminal" ক্লিক করুন। টার্মিনাল হলো আপনার ওয়ালেট/অ্যাকাউন্ট — যেমন: "পকেট" (ক্যাশ), "বিকাশ", "ব্যাংক", "ক্রেডিট কার্ড"। ডিফল্টভাবে "Pocket" টার্মিনাল আগে থেকেই তৈরি থাকে। যদি শুধু ক্যাশ ব্যবহার করেন, এই ধাপ বাদ দিতে পারেন।',
    },
    {
      en: '🟢 Step 4: Transfer Balance — From Income Record page, click "Balance Transfer". You can move money from one terminal to another. Example: Transfer ৳5,000 from "Pocket" to "Bkash". You can see all past transfers in Income > Transfer History.',
      bn: '🟢 ধাপ ৪: ব্যালেন্স ট্রান্সফার — Income Record পেজ থেকে "Balance Transfer" ক্লিক করুন। এক টার্মিনাল থেকে আরেকটিতে টাকা সরাতে পারবেন। উদাহরণ: "পকেট" থেকে "বিকাশে" ৳৫,০০০ ট্রান্সফার। Income > Transfer History-তে সব আগের ট্রান্সফার দেখা যাবে।',
    },
    {
      en: '🔴 Step 5: Create Expense Category — Go to Expense > Expense Category. Click "+ Add Expense Category". Give it a name (like "Food", "Transport", "Shopping"), pick an icon, add a description, and set a monthly budget (e.g. ৳5,000). The budget helps you track overspending.',
      bn: '🔴 ধাপ ৫: এক্সপেন্স ক্যাটাগরি তৈরি — Expense > Expense Category-তে যান। "+ Add Expense Category" ক্লিক করুন। নাম দিন (যেমন: "খাবার", "যাতায়াত", "শপিং"), আইকন বেছে নিন, বর্ণনা দিন, এবং মাসিক বাজেট সেট করুন (যেমন: ৳৫,০০০)। বাজেট আপনাকে অতিরিক্ত খরচ ট্র্যাক করতে সাহায্য করবে।',
      img: expenseCategoryImg,
    },
    {
      en: '🔴 Step 6: Add Expense Record — Go to Expense > Expense Record. Click "+ Add Expense". Fill in: Category (e.g. "Food"), Spend For/On (e.g. "Burger King" — this is WHAT you spent on), Amount (e.g. ৳350), Terminal (which wallet the money came from), Date, and Description.',
      bn: '🔴 ধাপ ৬: এক্সপেন্স রেকর্ড যোগ — Expense > Expense Record-এ যান। "+ Add Expense" ক্লিক করুন। পূরণ করুন: ক্যাটাগরি (যেমন: "খাবার"), স্পেন্ড ফর (যেমন: "বার্গার কিং" — এটি হলো কীসের জন্য খরচ), পরিমাণ (যেমন: ৳৩৫০), টার্মিনাল (কোন ওয়ালেট থেকে টাকা গেছে), তারিখ, এবং বিবরণ।',
      img: createExpenseImg,
    },
    {
      en: "📊 Step 7: Check Expense Breakdown — Go to Expense > Breakdown. Here you will see: a graph comparing this month's daily spending with last month, and a list showing total spent per category. This helps you understand WHERE your money goes.",
      bn: '📊 ধাপ ৭: এক্সপেন্স ব্রেকডাউন দেখুন — Expense > Breakdown-এ যান। এখানে দেখতে পাবেন: এই মাসের দৈনিক খরচের সাথে গত মাসের তুলনামূলক গ্রাফ, এবং প্রতি ক্যাটাগরিতে মোট কত খরচ হয়েছে তার তালিকা। এটি বুঝতে সাহায্য করে আপনার টাকা কোথায় যাচ্ছে।',
      img: expenseBreakdownImg,
    },
    {
      en: '🏠 Step 8: Check Overview (Dashboard) — Click "Overview" in the sidebar. This is your home page. Here you see: Total Income, Total Expense, Remaining Balance at the top. Below that: Financial Health Score, Financial Insights, and Monthly Budget tracking with colored progress bars.',
      bn: '🏠 ধাপ ৮: ওভারভিউ (ড্যাশবোর্ড) দেখুন — সাইডবারে "Overview" ক্লিক করুন। এটি আপনার হোম পেজ। এখানে দেখবেন: উপরে মোট ইনকাম, মোট এক্সপেন্স, অবশিষ্ট ব্যালেন্স। নিচে: ফাইন্যান্সিয়াল হেলথ স্কোর, ফাইন্যান্সিয়াল ইনসাইটস, এবং রঙিন প্রোগ্রেস বার সহ মাসিক বাজেট ট্র্যাকিং।',
      img: dashboardOverviewImg,
    },
    {
      en: '🔄 Step 9: Recurring Transactions — You can create a recurring transaction by checking the "Make it recurring" option when adding a new income or expense. Set the interval: Weekly, Monthly, or Yearly. Example: Monthly salary of ৳30,000 or Monthly internet bill of ৳1,000. The app will automatically add these records for you! You can also pause/resume (⏸️) or delete (🗑️) any recurring transaction from the Repeatative Hub.',
      bn: '🔄 ধাপ ৯: রিকারিং ট্রানজেকশন — নতুন ইনকাম বা এক্সপেন্স যোগ করার সময় "Make it recurring" অপশন চেক করে রিকারিং ট্রানজেকশন তৈরি করতে পারবেন। ইন্টারভাল বেছে নিন: সাপ্তাহিক, মাসিক, বা বার্ষিক। উদাহরণ: মাসিক বেতন ৳৩০,০০০ বা মাসিক ইন্টারনেট বিল ৳১,০০০। অ্যাপ স্বয়ংক্রিয়ভাবে এগুলো যোগ করবে! Repeatative Hub থেকে যেকোনো রিকারিং ট্রানজেকশন পজ/রিজিউম (⏸️) বা ডিলিট (🗑️) করতে পারবেন।',
      img: recurringImg,
    },
    {
      en: '📝 Step 10: Use Notes — Click "Notes" in the sidebar. Click "+ Add New Note" to create a note with a title and description. You can use notes to write personal reminders, shopping lists, or financial goals. Click on a note to view, edit, or delete it.',
      bn: '📝 ধাপ ১০: নোটস ব্যবহার — সাইডবারে "Notes" ক্লিক করুন। "+ Add New Note" ক্লিক করে একটি শিরোনাম ও বিবরণ সহ নোট তৈরি করুন। নোটসে ব্যক্তিগত রিমাইন্ডার, শপিং লিস্ট, বা আর্থিক লক্ষ্য লিখতে পারেন। নোটে ক্লিক করে দেখুন, এডিট বা ডিলিট করুন।',
      img: notesImg,
    },
    {
      en: '⚙️ Step 11: Settings — Click "Settings" in the sidebar. Here you can: change your profile avatar, update your name, and set up the "Auto Transfer" feature. Auto Transfer automatically carries your remaining balance from last month to this month\'s income — so you never lose track of leftover money.',
      bn: '⚙️ ধাপ ১১: সেটিংস — সাইডবারে "Settings" ক্লিক করুন। এখানে: প্রোফাইল অ্যাভাটার পরিবর্তন, নাম আপডেট, এবং "Auto Transfer" ফিচার সেটআপ করতে পারবেন। Auto Transfer স্বয়ংক্রিয়ভাবে গত মাসের অবশিষ্ট ব্যালেন্স এই মাসের ইনকামে যোগ করে — ফলে বাকি টাকার হিসাব কখনো হারাবে না।',
      img: settingsImg,
    },
    {
      en: '💡 Quick Summary: Income Source = Where money comes from (Job, Freelance). Expense Category = What type of spending (Food, Transport). Terminal = Where money is stored (Pocket, Bkash, Bank). Record = The actual transaction with amount and date.',
      bn: '💡 সংক্ষেপে: ইনকাম সোর্স = টাকা কোথা থেকে আসে (চাকরি, ফ্রিল্যান্স)। এক্সপেন্স ক্যাটাগরি = কী ধরনের খরচ (খাবার, যাতায়াত)। টার্মিনাল = টাকা কোথায় রাখা আছে (পকেট, বিকাশ, ব্যাংক)। রেকর্ড = আসল লেনদেন — পরিমাণ ও তারিখসহ।',
    },
  ],
};

export const AUTO_TRANSFER_MANUALS = {
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

export const HEALTH_SCORE_MANUALS = {
  en: {
    title: 'Financial Health Score',
    description: `The Financial Health Score evaluates your saving habits and adherence to budgets.`,
    tipsTitle: 'How it works',
    tips: [
      'Savings Rate (50 points): You get maximum points if you save 20% or more of your total income. The score decreases proportionally if you save less.',
      'Budget Adherence (50 points): You get maximum points if your total spending stays within the allocated budgets. Overspending reduces this score.',
      'If "budget" not added in your expense-category, a base score is given to encourage setting up limits. The total score determines your status: Excellent (80+), Good (50-79), or Needs Work (<50).',
    ],
  },
  bn: {
    title: 'ফাইন্যান্সিয়াল হেলথ স্কোর',
    description: `ফাইন্যান্সিয়াল হেলথ স্কোর আপনার সঞ্চয়ের অভ্যাস এবং বাজেট মেনে চলার মূল্যায়ন করে।`,
    tipsTitle: 'এটি কীভাবে কাজ করে',
    tips: [
      'সঞ্চয় হার (৫০ পয়েন্ট): আপনি যদি আয়ের ২০% বা তার বেশি সঞ্চয় করেন তবে সর্বোচ্চ পয়েন্ট পাবেন। সঞ্চয় কম হলে স্কোর আনুপাতিকভাবে কমে যায়।',
      'বাজেট মেনে চলা (৫০ পয়েন্ট): যদি আপনার মোট ব্যয় বরাদ্দ বাজেটের মধ্যে থাকে তবে সর্বোচ্চ পয়েন্ট পাবেন। অতিরিক্ত খরচ এই স্কোর কমিয়ে দেয়।',
      'যদি আপনার expense-category তে "বাজেট" না থাকে তাহলে একটি বেস স্কোর দেওয়া হয়। মোট স্কোর আপনার স্ট্যাটাস নির্ধারণ করে: চমৎকার (৮০+), ভালো (৫০-৭৯), বা আরও উন্নতির প্রয়োজন (<৫০)।',
    ],
  },
};

export const EXPENSE_INSIGHTS_MANUALS = {
  en: {
    title: 'Financial Insights',
    description: `Financial Insights provide automated analysis comparing your spending and savings to previous months.`,
    tipsTitle: 'How it works',
    tips: [
      'It compares your total expenses this month with the last month to show if your spending increased or decreased.',
      'It evaluates the growth or decline in your savings compared to the previous month.',
      'It identifies the month with the highest spending in the current year.',
    ],
  },
  bn: {
    title: 'আর্থিক অন্তর্দৃষ্টি (Financial Insights)',
    description: `আর্থিক অন্তর্দৃষ্টি আপনার ব্যয় এবং সঞ্চয়কে পূর্ববর্তী মাসের সাথে তুলনা করে স্বয়ংক্রিয় বিশ্লেষণ প্রদান করে।`,
    tipsTitle: 'এটি কীভাবে কাজ করে',
    tips: [
      'এটি গত মাসের সাথে আপনার এই মাসের মোট ব্যয়ের তুলনা করে দেখায় যে আপনার খরচ বেড়েছে নাকি কমেছে।',
      'এটি আগের মাসের তুলনায় আপনার সঞ্চয়ের বৃদ্ধি বা হ্রাস মূল্যায়ন করে।',
      'এটি চলতি বছরে আপনার সর্বোচ্চ ব্যয়ের মাসটিকে চিহ্নিত করে।',
    ],
  },
};

export const BUDGET_OVERVIEW_MANUALS = {
  en: {
    title: 'Monthly Budgets',
    description: `Monthly Budgets help you visually track your spending limits for each expense category.`,
    tipsTitle: 'How it works',
    tips: [
      'When adding or editing an expense category, you can set a budget limit.',
      'This overview displays a progress bar for each category with a budget, showing how much you have spent versus your limit.',
      'The progress bar turns yellow when you reach 80% of your budget, and red if you exceed it.',
    ],
  },
  bn: {
    title: 'মাসিক বাজেট',
    description: `মাসিক বাজেট আপনাকে প্রতিটি ব্যয়ের ক্যাটাগরির জন্য খরচের সীমা ট্র্যাক করতে সাহায্য করে।`,
    tipsTitle: 'এটি কীভাবে কাজ করে',
    tips: [
      'বাজেট সীমা সেট করতে আপনি এক্সপেন্স ক্যাটাগরি যুক্ত বা এডিট করার সময় বাজেট সেট করতে পারেন।',
      'এই ওভারভিউতে প্রতিটি বাজেটের জন্য একটি প্রগ্রেস বার থাকে, যা দেখায় আপনি সীমার তুলনায় কত খরচ করেছেন।',
      'বাজেটের ৮০% ছুঁয়ে গেলে প্রগ্রেস বার হলুদ হয়ে যায়, এবং অতিক্রম করলে লাল হয়ে যায়।',
    ],
  },
};

export const CURRENCY = '৳';
export const TOKEN = 'token';
export const USER = 'user';
export const TOKEN_EXPIRED_DAY = 30;
export const MAX_DATE_FOR_AUTO_TRANSFER = 7;
export const DATA_QUANTITY = [10, 25, 50];

export const ENVIRONMENT = {
  STAGE: 'stage',
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};

export const RECURRING_INTERVAL = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

export const NOTIFICATION_TYPE_CONFIG = {
  info: { icon: 'ℹ️', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  warning: { icon: '⚠️', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  error: { icon: '❌', color: 'text-red-400', bg: 'bg-red-500/20' },
  success: { icon: '✅', color: 'text-green-400', bg: 'bg-green-500/20' },
};

export const SENTRY_LEVEL_CONFIG = {
  critical: { label: 'Critical', bg: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  high: { label: 'High', bg: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  medium: { label: 'Medium', bg: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  low: { label: 'Low', bg: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
};
export const SENTRY_SOURCE_CONFIG = {
  backend: { label: 'Backend', bg: 'bg-indigo-100 text-indigo-700' },
  bff: { label: 'BFF', bg: 'bg-purple-100 text-purple-700' },
  frontend: { label: 'Frontend', bg: 'bg-gray-200 text-gray-500' },
};

export const SENTRY_SOURCE_OPTIONS = ['backend', 'bff', 'frontend'];
export const SENTRY_LEVEL_OPTIONS = ['critical', 'high', 'medium', 'low'];
export const SENTRY_STATUS_OPTIONS = ['open', 'resolved'];
export const POLL_INTERVAL = 180000; // 180 seconds
