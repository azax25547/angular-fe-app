export interface Expense {
  id: string;
  expenses: [
    {
      id: number;
      name: string;
      description: string;
      value: number;
      dateOfExpense: string;
      modeOfExpense: string;
      createdAt: Date;
      updatedAt: Date;
      category: {
        category: string;
      };
    }
  ];
}
