import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(private http: HttpClient, private env: EnvService) {}
  authServiceURL: string = this.env.enableDebug
    ? 'http://localhost:3000/api/v1/auth'
    : 'https://test-finance.onrender.com/api/v1/auth';

  setAuthenticated(v: boolean) {
    this.isAuthenticated = v;
  }

  isUserAuthenticated() {
    return this.retrieveUserToken() !== null;
  }

  sendLoginDetails(body: any): Observable<any> {
    return this.http.post(`${this.authServiceURL}/login`, body);
  }

  sendSignUpDetails(body: any): Observable<any> {
    return this.http.post(`${this.authServiceURL}/signup`, body);
  }

  storeUserToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  retrieveUserToken(): string {
    return sessionStorage.getItem('token')!;
  }

  logoutUser() {
    this.setAuthenticated(false);
    sessionStorage.clear();
    this.http.get(`${this.authServiceURL}/logout`).subscribe({
      next: (d) => {
        // do something
      },
      error: (err) => console.log(err),
    });
  }
}
