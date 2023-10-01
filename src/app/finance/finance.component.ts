import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user';
import { FinanceService } from '../services/finance.service';
import { Expense } from '../interface/expense';
import { Subscription } from '../interface/subscription';
import { Income } from '../interface/income';
import { ModalService } from '../services/modal.service';
import { ExpenseformComponent } from './expenseform/expenseform.component';
import { Subject } from 'rxjs';
import convert from '../utils/convertISOtoDate';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent {
  userDetails: any;
  userExpenses: Expense | undefined;
  userSubscriptions: Subscription | undefined;
  userIncomes: Income | undefined;
  screen: string = '';
  isLoading: boolean = false;
  showD: boolean = true;
  categories: [] = [];

  error: any;

  constructor(
    private us: UserService,
    private fs: FinanceService,
    private ms: ModalService
  ) {
    this.ms.notifyParent$.subscribe((d) => {
      if (d === 'expense')
        this.getFinanceDetails(this.userDetails?.id || '', 'Expense');
      else if (d === 'subscriptions')
        this.getFinanceDetails(this.userDetails?.id || '', 'Subscription');
      else if (d === 'incomes')
        this.getFinanceDetails(this.userDetails?.id || '', 'Income');
    });
  }

  switchScreen(screen: string) {
    this.screen = screen;
    this.showD = false;
  }

  convertIsoToDdMmYyyy(isoDate: string): string {
    return convert(isoDate);
  }

  openExpenseModal() {
    this.ms.openModal();
  }

  editExpenseModal(id: any) {
    const data = this.userExpenses?.expenses.filter((v) => v.id == id);
    let formData = {
      data,
      mode: 'edit',
    };
    this.ms.editModal(formData);
  }

  getFinanceDetails(userID: string, type: string) {
    if (type === 'Expense') {
      this.fs.getAllFinanceDetails(userID, type).subscribe({
        next: (data: any) => {
          this.userExpenses = data;
        },
        error: (err: any) => (this.error = err),
      });
    } else if (type === 'Subscription') {
      this.fs.getAllFinanceDetails(userID, type).subscribe({
        next: (data: any) => {
          this.userSubscriptions = data;
        },
        error: (err: any) => (this.error = err),
      });
    } else if (type === 'Income') {
      this.fs.getAllFinanceDetails(userID, type).subscribe({
        next: (data: any) => {
          this.userIncomes = data;
        },
        error: (err: any) => (this.error = err),
      });
    }
  }

  ngOnInit() {
    let userSessionDetails: any = sessionStorage.getItem('user');
    this.userDetails = JSON.parse(userSessionDetails);
    this.getFinanceDetails(this.userDetails?.id || '', 'Expense');
    this.getFinanceDetails(this.userDetails?.id || '', 'Subscription');
    this.getFinanceDetails(this.userDetails?.id || '', 'Income');
  }
}
