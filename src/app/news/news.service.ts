import { News } from '../interface/indian-express';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(news: String): Observable<News> {
    return this.http.get<News>(`https://panicky-handkerchief-hare.cyclic.app/v1/api/ca/news/${news}`)
  }

  getMoreNews(news: String, page: number): Observable<News> {
    return this.http.get<News>(`https://panicky-handkerchief-hare.cyclic.app/v1/api/ca/news/${news}?page=${page}`)
  }

  getNewsContent(news: String, url: string): Observable<any> {
    return this.http.post(`https://panicky-handkerchief-hare.cyclic.app/v1/api/ca/news/${news}`, { url })
  }
}
