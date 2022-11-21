import { IndianExpress } from '../indian-express';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {


  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get<IndianExpress>('https://testing-backend-for-25547.herokuapp.com/v1/api/ca/news/indianexpress')
  }
}
