import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { FinanceService } from '../services/finance.service';
import { Expense } from '../interface/expense';
import { Subscription } from '../interface/subscription';
import { Income } from '../interface/income';
import { ModalService } from '../services/modal.service';
import { ColDef } from 'ag-grid-community';
import convert from '../utils/convertISOtoDate';
import { JwtService } from '../services/jwt.service';
import { AgDataService } from '../services/ag-data.service';
import {
  expenseDefColumn,
  incomeDefColumn,
  subscriptionDefColumn,
} from '../columnDefs/colDefs';
import { AgBaseComponentComponent } from '../ag-base-component/ag-base-component.component';

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
  userIncomes!: Income;
  screen: string = '';
  isLoading: boolean = false;
  categories: [] = [];
  subtotalExpenseValue: number = 0;
  subtotalSubscriptionValue: number = 0;
  subtotalIncomeValue: number = 0;
  error: any;
  gridApi: any;
  gridColumnApi: any;
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50, 100];

  constructor(
    private us: UserService,
    private fs: FinanceService,
    private ms: ModalService,
    private jwt: JwtService,
    private ds: AgDataService
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

  @ViewChild(AgBaseComponentComponent)
  agComponent!: AgBaseComponentComponent;

  public defaultColDef: ColDef = {
    filter: 'agTextColumnFilter',
  };

  rowData: any = [];
  subRowData: any = [];
  incomeRowData: any = [];

  expenseColDefs: ColDef[] = expenseDefColumn;
  subscriptionColDefs: ColDef[] = subscriptionDefColumn;
  incomeColDefs: ColDef[] = incomeDefColumn;

  switchScreen(screen: string) {
    this.screen = screen;
  }

  convertIsoToDdMmYyyy(isoDate: string): string {
    return convert(isoDate);
  }

  openModal(comp: string) {
    this.ms.openModal([], comp);
  }

  private deleteIdAndOthers(d: any) {
    d.map((x: any) => {
      delete x.id;
      delete x.updatedAt;
      delete x.createdAt;
    });
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
          let s = data.expenses.map((x: any) => ({
            ...x,
            category: x.category.category,
          }));
          this.deleteIdAndOthers(s);
          this.rowData = [];
          s.map((x: any) => this.rowData.push(x));
          this.ds.setData(this.rowData);
          if (typeof this.agComponent !== 'undefined') {
            this.agComponent.gridApi.updateGridOptions({
              rowData: this.rowData,
            });
          }
          this.subtotalExpenseValue = this.getSubtotal(data.expenses);
        } else if (type == 'Subscription') {
          this.userSubscriptions = data;
          this.deleteIdAndOthers(data.subscriptions);
          this.subRowData = data.subscriptions;
          this.ds.setData(this.subRowData);
          this.subtotalSubscriptionValue = this.getSubtotal(data.subscriptions);
          if (typeof this.agComponent !== 'undefined') {
            this.agComponent.gridApi.updateGridOptions({
              rowData: this.subRowData,
            });
          }
        } else if (type === 'Income') {
          this.userIncomes = data;
          this.deleteIdAndOthers(data.incomes);
          this.incomeRowData = data.incomes;
          this.ds.setData(this.incomeRowData);
          if (typeof this.agComponent !== 'undefined') {
            this.agComponent.gridApi.updateGridOptions({
              rowData: this.incomeRowData,
            });
          }
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
