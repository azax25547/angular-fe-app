import convert from '../utils/convertISOtoDate';

const expenseDefColumn = [
  { field: 'name', flex: 1, editable: true },
  { field: 'description', flex: 1 },
  {
    field: 'value',
    flex: 1,
    valueFormatter: (p: { value: number }) =>
      '₹ ' + Math.floor(p.value).toLocaleString(),
  },
  { field: 'category', flex: 1 },
  {
    field: 'dateOfExpense',
    flex: 1,
    valueFormatter: (p: { value: string }) => convert(p.value),
  },
  { field: 'modeOfExpense', flex: 1 },
];

const subscriptionDefColumn = [
  { field: 'name', flex: 1 },
  { field: 'description', flex: 1 },
  {
    field: 'value',
    flex: 1,
    valueFormatter: (p: { value: number }) =>
      '₹ ' + Math.floor(p.value).toLocaleString(),
  },
  { field: 'subType', flex: 1 },
  {
    field: 'dateOfStart',
    flex: 1,
    valueFormatter: (p: { value: string }) => convert(p.value),
  },
  {
    field: 'dateOfEnd',
    flex: 1,
    valueFormatter: (p: { value: string }) => convert(p.value),
  },
  {
    field: 'dateOfNextPayment',
    flex: 1,
    valueFormatter: (p: { value: string }) => convert(p.value),
  },
  { field: 'reminder', flex: 1 },
  { field: 'active', flex: 1 },
];

const incomeDefColumn = [
  { field: 'name', flex: 1 },
  { field: 'description', flex: 1 },
  {
    field: 'value',
    flex: 1,
    valueFormatter: (p: { value: number }) =>
      '₹ ' + Math.floor(p.value).toLocaleString(),
  },
  { field: 'incomeType', flex: 1 },
  {
    field: 'dateOfIncome',
    flex: 1,
    valueFormatter: (p: { value: string }) => convert(p.value),
  },
  { field: 'modeOfIncome', flex: 1 },
];

export { expenseDefColumn, subscriptionDefColumn, incomeDefColumn };
