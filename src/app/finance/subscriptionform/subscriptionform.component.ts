import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FinanceService } from 'src/app/services/finance.service';
import { JwtService } from 'src/app/services/jwt.service';
import { ModalService } from 'src/app/services/modal.service';
import convert from 'src/app/utils/convertISOtoDate';

@Component({
  selector: 'app-subscriptionform',
  templateUrl: './subscriptionform.component.html',
  styleUrls: ['./subscriptionform.component.css'],
})
export class SubscriptionformComponent {
  subscriptionForm: FormGroup;
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

    this.subscriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      value: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10000000)],
      ],
      subType: ['', Validators.required],
      dateOfStart: [''],
      dateOfEnd: [''],
      dateOfNextPayment: [''],
      reminder: [false],
      active: [false],
    });

    if (this.record?.data && this.isUpdate) {
      this.subscriptionForm.setValue({
        name: this.record.data[0].name,
        description: this.record.data[0].description,
        value: this.record.data[0].value,
        subType: this.record.data[0].subType,
        reminder: this.record.data[0].reminder,
        active: this.record.data[0].active,
        dateOfStart: convert(this.record.data[0].dateOfStart),
        dateOfEnd: convert(this.record.data[0].dateOfEnd),
        dateOfNextPayment: convert(this.record.data[0].dateOfEnd),
      });
    }
  }

  closeModal(): void {
    this.ms.formData = undefined;
    this.ms.closeModal();
  }

  onSubscriptionSubmit() {
    if (this.isUpdate) {
      if (this.record && this.subscriptionForm.valid) {
        const subscriptionId: any = this.record.data[0].id;
        let body = {
          ...this.subscriptionForm.value,
        };
        this.fs.updateSubscriptionDetails(body, subscriptionId).subscribe({
          next: (data) => {
            this.toastr.success(
              'Subscription updated Successfully.',
              'Success',
              {
                closeButton: true,
              }
            );
            this.closeModal();
            this.ms.notifyParent('subscription');
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
      if (this.subscriptionForm.valid) {
        const userId: any = this.jwt.decodeToken().id;
        let body = {
          ...this.subscriptionForm.value,
          userId,
        };
        this.fs.saveSubscriptionDetails(body).subscribe({
          next: (data) => {
            this.toastr.success('Subscription saved Successfully.', 'Success', {
              closeButton: true,
            });
            this.closeModal();
            this.ms.notifyParent('subscription');
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
