import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  constructor(private env: EnvService, private http: HttpClient) {}
  error: any;
  //   expenses: Expense[] | undefined;
  financeServiceURL: string = this.env.enableDebug
    ? 'http://localhost:3000/api/v1/'
    : 'x';

  subscribeDetails(service: Observable<any>, serviceDataHolder: any) {
    service.subscribe({
      next: (data): Observable<any> => (serviceDataHolder = data),
      error: (err) => (this.error = err),
    });
  }

  getAllFinanceDetails(userid: string, type: string) {
    let queryParams = new HttpParams();
    let response: any;
    if (type === 'Expense') {
      queryParams = queryParams.append('id', userid);
      response = this.http.get(`${this.financeServiceURL}expenses/all`, {
        params: queryParams,
      });
    } else if (type === 'Subscription') {
      queryParams = queryParams.append('id', userid);
      response = this.http.get(`${this.financeServiceURL}subscriptions/all`, {
        params: queryParams,
      });
    } else if (type === 'Income') {
      queryParams = queryParams.append('id', userid);
      response = this.http.get(`${this.financeServiceURL}incomes/all`, {
        params: queryParams,
      });
    }

    return response;
  }
}
