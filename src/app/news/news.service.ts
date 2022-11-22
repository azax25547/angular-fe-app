import { IndianExpress } from '../indian-express';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get<IndianExpress>('https://testing-backend-for-25547.herokuapp.com/v1/api/ca/news/ie')
  }
}
