import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FinanceService } from 'src/app/services/finance.service';
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
  @Input() dataFromComponent: any;
  constructor(
    private ms: ModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fs: FinanceService
  ) {
    this.record = this.ms.formData;
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

    if (this.record?.data && this.record?.data.length > 0) {
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
    this.ms.closeModal();
  }

  onExpenseSubmit() {
    if (this.record) {
      if (this.expenseForm.valid) {
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
        const userId: any = sessionStorage.getItem('user');
        let body = {
          ...this.expenseForm.value,
          userId: JSON.parse(userId).id,
        };
        this.fs.saveExpenseDetails(body).subscribe({
          next: (data) => {
            this.toastr.success('Expense saved Successfully.', 'Success', {
              closeButton: true,
            });
            this.closeModal();
            this.ms.notifyParent('expense');
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
