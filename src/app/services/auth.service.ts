import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(private http: HttpClient) {}

  setAuthenticated(v: boolean) {
    this.isAuthenticated = v;
  }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  sendLoginDetails(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/auth/login', body);
  }

  sendSignUpDetails(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/auth/signup', body);
  }

  storeUserToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  retrieveUserToken(): string {
    return sessionStorage.getItem('token')!;
  }
}
