import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interface/user';
import { FinanceService } from '../services/finance.service';
import { Expense } from '../interface/expense';
import { Subscription } from '../interface/subscription';
import { Income } from '../interface/income';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent {
  userDetails: User | undefined;
  userExpenses: Expense | undefined;
  userSubscriptions: Subscription | undefined;
  userIncomes: Income | undefined;

  error: any;

  constructor(private us: UserService, private fs: FinanceService) {
    this.userDetails = this.us.userDetails;
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
    this.getFinanceDetails(this.userDetails?.id || '', 'Expense');
    this.getFinanceDetails(this.userDetails?.id || '', 'Subscription');
    this.getFinanceDetails(this.userDetails?.id || '', 'Income');
  }
}
