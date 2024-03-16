export interface Subscription {
  id: string;
  subscriptions: [
    {
      id: number;
      name: string;
      description: string;
      value: number;
      subType: string;
      dateOfStart: Date;
      dateOfEnd: Date;
      dateOfNextPayment: Date;
      reminder: boolean;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
}
