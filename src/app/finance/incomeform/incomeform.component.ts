import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FinanceService } from 'src/app/services/finance.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ModalService } from 'src/app/services/modal.service';
import convert from 'src/app/utils/convertISOtoDate';

@Component({
  selector: 'app-incomeform',
  templateUrl: './incomeform.component.html',
  styleUrls: ['./incomeform.component.css'],
})
export class IncomeformComponent {
  incomeForm: FormGroup;
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
    private jwt: JwtService
  ) {
    this.record = this.ms.formData;
    if (this.record.data && this.record.data.isUpdate) this.isUpdate = true;

    this.incomeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      value: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10000000)],
      ],
      incomeType: ['', Validators.required],
      dateOfIncome: [''],
      modeOfIncome: [''],
    });

    if (this.record?.data && this.isUpdate) {
      this.incomeForm.setValue({
        name: this.record.data[0].name,
        description: this.record.data[0].description,
        value: this.record.data[0].value,
        incomeType: this.record.data[0].incomeType,

        dateOfIncome: convert(this.record.data[0].dateOfIncome),
        modeOfIncome: this.record.data[0].modeOfIncome,
      });
    }
  }

  closeModal(): void {
    this.ms.formData = undefined;
    this.ms.closeModal();
    this.isUpdate = false;
  }

  onIncomeSubmit() {
    if (this.isUpdate) {
      if (this.record && this.incomeForm.valid) {
        const incomeId: any = this.record.data[0].id;
        let body = {
          ...this.incomeForm.value,
        };
        this.fs.updateIncomeDetails(body, incomeId).subscribe({
          next: (data) => {
            this.toastr.success('Income updated Successfully.', 'Success', {
              closeButton: true,
            });
            this.closeModal();
            this.ms.notifyParent('income');
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
      if (this.incomeForm.valid) {
        const userId: any = this.jwt.decodeToken().id;
        let body = {
          ...this.incomeForm.value,
          userId,
        };
        this.fs.saveIncomeDetails(body).subscribe({
          next: (data) => {
            this.toastr.success('Income saved Successfully.', 'Success', {
              closeButton: true,
            });
            this.closeModal();
            this.ms.notifyParent('income');
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
