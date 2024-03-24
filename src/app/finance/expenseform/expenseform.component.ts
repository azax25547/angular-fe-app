import { formatDate } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AgBaseComponentComponent } from 'src/app/ag-base-component/ag-base-component.component';
import { AgDataService } from 'src/app/services/ag-data.service';
import { FinanceService } from 'src/app/services/finance.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ModalService } from 'src/app/services/modal.service';
import convert from 'src/app/utils/convertISOtoDate';

@Component({
  selector: 'app-expenseform',
  templateUrl: './expenseform.component.html',
  styleUrls: ['./expenseform.component.css'],
})
export class ExpenseformComponent {
  expenseForm: FormGroup;
  categories: any = [];
  subModule: any = '';
  record: any;
  isUpdate: any = false;
  @Input() dataFromComponent: any;
  constructor(
    private ms: ModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fs: FinanceService,
    private jwt: JwtService,
    private ds: AgDataService
  ) {
    this.record = this.ms.formData;
    if (this.record.data && this.record.data.isUpdate) this.isUpdate = true;

    this.fs.getAllExpenseCategories().subscribe({
      next: (data: any) => {
        this.categories = data?.allExpenseCategories;
      },
      error: (err: any) => this.toastr.error(err.message, 'Error'),
    });

    this.expenseForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      value: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10000000)],
      ],
      dateOfExpense: ['', Validators.required],
      modeOfExpense: ['', Validators.required],
      expenseId: ['', Validators.required],
    });

    if (this.record?.data && this.isUpdate) {
      console.log(convert(this.record.data[0].dateOfExpense));
      this.expenseForm.setValue({
        name: this.record.data[0].name,
        description: this.record.data[0].description,
        value: this.record.data[0].value,
        dateOfExpense: convert(this.record.data[0].dateOfExpense),
        modeOfExpense: this.record.data[0].modeOfExpense,
        expenseId: this.record.data[0].category.category,
      });
    }
  }

  closeModal(): void {
    this.ms.formData = undefined;
    this.isUpdate = false;
    this.ms.closeModal();
  }

  onExpenseSubmit() {
    if (this.isUpdate) {
      if (this.record && this.expenseForm.valid) {
        const expenseId: any = this.record.data[0].id;
        let body = {
          ...this.expenseForm.value,
        };
        this.fs.updateExpenseDetails(body, expenseId).subscribe({
          next: (data) => {
            this.toastr.success('Expense updated Successfully.', 'Success', {
              closeButton: true,
            });
            this.closeModal();
            this.ms.notifyParent('expense');
            this.isUpdate = false;
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Unsucessful', {
              closeButton: true,
            });
          },
        });
      } else {
        this.toastr.warning(
          'Please select all the Input details',
          'Submission Error',
          {
            closeButton: true,
          }
        );
      }
    } else {
      if (this.expenseForm.valid) {
        const userId: any = this.jwt.decodeToken().id;
        let body = {
          ...this.expenseForm.value,
          userId,
        };
        this.fs.saveExpenseDetails(body).subscribe({
          next: (data) => {
            this.toastr.success('Expense saved Successfully.', 'Success', {
              closeButton: true,
            });
            this.closeModal();
            this.ms.notifyParent('expense');
            // this.ds.setData
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Unsucessful', {
              closeButton: true,
            });
          },
        });
      } else {
        this.toastr.warning(
          'Please select all the Input details',
          'Submission Error',
          {
            closeButton: true,
          }
        );
      }
    }
  }
}
