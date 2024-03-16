import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FinanceService } from '../services/finance.service';
import { Expense } from '../interface/expense';
import { Subscription } from '../interface/subscription';
import { Income } from '../interface/income';
import { ModalService } from '../services/modal.service';

import convert from '../utils/convertISOtoDate';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent {
  userDetails: {
    id: string;
    name: string;
  } = {
    id: '',
    name: '',
  };
  userExpenses: Expense | undefined;
  userSubscriptions: Subscription | undefined;
  userIncomes: Income | undefined;
  screen: string = '';
  isLoading: boolean = false;
  categories: [] = [];
  subtotalExpenseValue: number = 0;
  subtotalSubscriptionValue: number = 0;
  subtotalIncomeValue: number = 0;

  error: any;

  constructor(
    private us: UserService,
    private fs: FinanceService,
    private ms: ModalService,
    private jwt: JwtService
  ) {
    this.ms.notifyParent$.subscribe((d) => {
      if (d === 'expense')
        this.getFinanceDetails(this.userDetails?.id || '', 'Expense');
      else if (d === 'subscription')
        this.getFinanceDetails(this.userDetails?.id || '', 'Subscription');
      else if (d === 'income')
        this.getFinanceDetails(this.userDetails?.id || '', 'Income');
    });
  }

  switchScreen(screen: string) {
    this.screen = screen;
  }

  convertIsoToDdMmYyyy(isoDate: string): string {
    return convert(isoDate);
  }

  openModal(comp: string) {
    this.ms.openModal([], comp);
  }

  getSubtotal(data: any): number {
    let values: [number] = data.map((x: { value: any }) => x.value);
    return values.reduce((x, y) => x + y, 0);
  }

  editModal(id: any, comp: string) {
    let data;
    if (comp === 'expense')
      data = this.userExpenses?.expenses.filter((v) => v.id == id);
    else if (comp === 'subscription')
      data = this.userSubscriptions?.subscriptions.filter((v) => v.id == id);
    else if (comp == 'income')
      data = this.userIncomes?.incomes.filter((v) => v.id == id);
    let formData = {
      data: { ...data, isUpdate: true },
      mode: 'edit',
    };
    this.ms.editModal(formData, comp);
  }

  getFinanceDetails(userID: string, type: string) {
    this.fs.getAllFinanceDetails(userID, type).subscribe({
      next: (data: any) => {
        if (type == 'Expense') {
          this.userExpenses = data;
          this.subtotalExpenseValue = this.getSubtotal(data.expenses);
        } else if (type == 'Subscription') {
          this.userSubscriptions = data;
          this.subtotalSubscriptionValue = this.getSubtotal(data.subscriptions);
        } else if (type === 'Income') {
          this.userIncomes = data;
          this.subtotalIncomeValue = this.getSubtotal(data.incomes);
        }
      },
      error: (err: any) => (this.error = err),
    });
  }

  ngOnInit() {
    let userData: any = this.jwt.decodeToken() || '';
    if (userData !== '') {
      this.userDetails.id = userData.id;
      this.us.getUserDetailOne(this.userDetails.id).subscribe({
        next: (data: any) => (this.userDetails.name = data.name),
        error: (err) => (this.error = err),
      });
    }

    if (userData) this.ms.notifyParent('login');

    this.getFinanceDetails(this.userDetails?.id || '', 'Expense');
    this.getFinanceDetails(this.userDetails?.id || '', 'Subscription');
    this.getFinanceDetails(this.userDetails?.id || '', 'Income');
  }
}
