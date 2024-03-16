import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetails: User | undefined;
  error: any;
  constructor(private http: HttpClient, private env: EnvService) {}

  userServiceURL: string = this.env.enableDebug
    ? 'http://localhost:3000/api/v1/users/'
    : 'https://test-finance.onrender.com/api/v1/users/';

  subscribeUserDetails(us: Observable<User>) {
    us.subscribe({
      next: (data): User => (this.userDetails = data),
      error: (err) => (this.error = err),
    });
  }

  getUserDetailOne(id: string): Observable<User> {
    return this.http.get<User>(this.userServiceURL + id);
  }
}
