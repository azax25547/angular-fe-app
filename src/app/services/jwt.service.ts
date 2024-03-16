import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }
}
