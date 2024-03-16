import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;

      const body = {
        username,
        password,
      };

      this.auth.sendLoginDetails(body).subscribe({
        next: (data) => {
          if (data && data.status) {
            this.auth.storeUserToken(data.user.token);
            this.auth.setAuthenticated(true);
            this.toastr.success('Login Successful', 'Info', {
              closeButton: true,
            });
            this.router.navigate(['/finance']);
          }
        },
        error: (err) => {
          if (err.status == 401)
            this.toastr.warning(err.error.message, 'Info', {
              closeButton: true,
            });
          else
            this.toastr.error(err.message, 'Error', {
              closeButton: true,
            });
        },
      });
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      const username = this.signupForm.get('username')!.value;
      const email = this.signupForm.get('email')!.value;
      const password = this.signupForm.get('password')!.value;

      const body = {
        name: username,
        email,
        password,
      };

      this.auth.sendSignUpDetails(body).subscribe({
        next: (data) => {
          console.log(data);
          if (data.status) {
            this.toastr.success(
              'Signup Successful.Please Login again to access the Application',
              'Info',
              {
                closeButton: true,
              }
            );
          } else {
            this.toastr.warning(data.message, 'Warning', {
              closeButton: true,
            });
          }
        },
        error: (err) => {
          if (err.status == 401)
            this.toastr.warning(err.error.message, 'Info', {
              closeButton: true,
            });
          else
            this.toastr.error(err.message, 'Error', {
              closeButton: true,
            });
        },
      });
    }
  }
}
