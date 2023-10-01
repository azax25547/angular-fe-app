// modal.service.ts

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { FinanceService } from './finance.service';
import { Subject } from 'rxjs';
import { ExpenseformComponent } from '../finance/expenseform/expenseform.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  formData: any = [];
  error: any = '';
  private notifyParentSubject: Subject<any> = new Subject<any>();
  constructor(private dialog: MatDialog, private fs: FinanceService) {}

  notifyParent$ = this.notifyParentSubject.asObservable();

  notifyParent(v: any) {
    this.notifyParentSubject.next(v);
  }

  editModal(dt: any) {
    this.formData = dt;
    this.dialog.open(ModalComponent, {
      width: '600px',
      height: '400px',
    });
  }

  openModal() {
    this.dialog.open(ModalComponent, {
      width: '600px',
      height: '400px',
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
