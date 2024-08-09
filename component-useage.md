## ===== input =====
```
<Input className="max-h-[48px] max-w-[400px]"
type = ['text', 'password', 'checkbox', 'date', 'datetime-local', 'tel', 'week', 'month']
label=''
iconLeft=element
iconRight=element
onChange=()=>{}
value=''
placeholder=''
labelClass=''
iconClass=''
inputClass=''
/>
```

## ===== button =====
```
<Button
  size=['small', 'md', 'large']
  color=['primary', 'secondary', 'danger']
  iconLeft={'>>'}
  onClick={() => console.log('Small primary button clicked')}
  iconRight='<<'
  iconClass=''
>
   Small Primary Button
</Button>
```

## ===== table =====
```
# data part

const data = [
  {
    income_category_id: 1,
    user_id: 1,
    name: 'freelancing',
    amount:50,
    comment: null,
    created_at: '2024-03-15T09:48:47.000Z',
  },
  {
    income_category_id: 2,
    user_id: 1,
    name: 'freelancing',
    amount:-20,
    comment: null,
    created_at: '2024-03-15T09:55:28.000Z',
  },
];

const headers = [
  {
    label: 'Name',
    style: 'w-1/4 text-sm lg:text-md capitalize', // for both th and td
    thStyle: '', // only for th
    tdStyle: '', // only for td
    conditionalStyles: [{
      condition: (value) => value < 0, // Condition for negative values
      style: 'text-red-500', // Style to apply for negative values
    },
    {
        condition: (value) => value, // true for any condition
        style: 'md:text-sm lg:text-sm',
      },
    ],
    target: 'name',
  },
  {
    label: 'Created',
    style: 'w-1/4 text-sm lg:text-md',
    target: 'created_at',
    function: getDate,
  },
  {
    label: 'Amount',
    style: 'w-24 md:w-1/4 text-sm lg:text-md',
    target: 'amount',
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
    label: 'Comment',
    style: 'w-1/4 text-sm lg:text-md',
    target: 'comment',
  },
  {
    label: 'Action',
    style: 'w-1/4 text-sm lg:text-md',
    target: 'action',
    action: [
      { label: 'Edit', onClick: (row) => handleEdit(row), style: 'text-blue-300' },
      { label: 'Delete', onClick: (row) => handleDelete(row), style: 'text-pRed' },
    ],
  },
];
const data = [
  {
    income_category_id: 1,
    user_id: 1,
    name: 'freelancing',
    comment: null,
    created_at: '2024-03-15T09:48:47.000Z',
  },
  {
    income_category_id: 2,
    user_id: 1,
    name: 'freelancing',
    comment: null,
    created_at: '2024-03-15T09:55:28.000Z',
  },
];
const handleEdit = (row) => {
  console.log('Edit:', row);
};
const handleDelete = (row) => {
  console.log('Delete:', row);
};
```
```
// --- usage part ---
<CustomTable
  headers={headers}
  data={data}
  // enableSearch
  enablePagination
  dataPerPage={10}
  className={'w-full'}
  tableClass={'rounded-md p-4 shadow-md'}
  inputClass=""
  headerClass=""
  rowClass=""
  errorMessage="special error found",
  paginationClass="",
  paginationBtnClass="",
  paginationBtnColor="",
/>
```

## ===== select-options =====
```const [selectedOption, setSelectedOption] = useState('');
const handle = (option) => {
  setSelectedOption(option.label);
};
const options = [
    {
      income_category_id: 1,
      user_id: 1,
      name: 'freelancing',
      comment: null,
      created_at: '2024-03-15T09:48:47.000Z',
    },
  ];
```
```
// --- usage part ---
<SelectOption
  className="size-full"
  name="income_category_name"
  label="Source Name"
  onChange={(e) => handle(e)}
  value={selectedOption}
  placeholder="Select one"
  labelClass="font-normal"
  options={options}
  optionLabel={'name'}
  optionValue={'income_category_name'}
  required
/>
```

## ===== modal =====
```
const [isOpen, setIsOpen] = useState(false);
const openModal = () => {
  setIsOpen(true);
};
```
```
// --- usage part ---
<button onClick={openModal}>Open Modal</button>
<Modal isOpen={isOpen} setIsOpen={setIsOpen} showCloseButton className={'p-6 shadow-xl shadow-black/40'}>
  <div className="">
    <h2 className="mb-3 text-xl font-bold">Modal Content</h2>
    <p>This is the content of the modal.</p>
  </div>
</Modal>;
```


## ===== Doughnut chart =====
```
// --- usage part ---
  <DoughnutChart
    title={'Dummy Title'}
    titleStyle={{ color: '#299D91', fontSize: 16, fontWeight: 'bold' }}
    data={[]} // [10,20]
    labels={[]} // ['food', 'entertainment']
    colors={[]} // ['#e4e4e4','#fff095']
    className="h-full"
  />
```

```
## ===== Scale chart =====
 // --- usage part ---
  <ScaleChart
    className={'h-96 w-full'}
    xLabel={['1 feb', '2 feb', '3 feb'...]} // array
    data={[
      { label: 'This Month', data: [70, 40, 75, 89], hoverBackgroundColor: '#1d756c' },
      { label: 'Prev Month', data: [60, 40, 95, 50], backgroundColor: '#ff63844d' },
    ]}
  />
```

## DatePicker
```
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

<DatePicker
  showIcon
  selected={income.date}
  onChange={(date) => setIncome({ ...income, date })}
  // calendarClassName={calendarClassName}
  // className={className}
  dateFormat={'dd/MM/yyyy'}
  // startDate={startDate}
  // endDate={endDate}
  // selectsRange={selectsRange}
  placeholderText={'placeholderText'}
/>
```