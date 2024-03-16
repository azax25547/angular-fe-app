export interface Income {
  id: string;
  incomes: [
    {
      id: number;
      name: string;
      description: string;
      value: number;
      modeOfIncome: string;
      dateOfIncome: Date;
      incomeType: Date;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
}
