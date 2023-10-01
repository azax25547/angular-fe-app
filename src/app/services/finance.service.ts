import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
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

  saveExpenseDetails(body: any): Observable<any> {
    let response: any = this.http.post(
      `${this.financeServiceURL}expenses/create`,
      body
    );
    return response;
  }

  updateExpenseDetails(body: any, id: any): Observable<any> {
    let response: any = this.http.put(
      `${this.financeServiceURL}expenses/update/${id}`,
      body
    );
    return response;
  }

  getAllExpenseCategories(): Observable<any> {
    let response: any = this.http.get(
      `${this.financeServiceURL}expenses/categories`
    );
    return response;
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
