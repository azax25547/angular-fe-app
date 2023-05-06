import { News } from '../interface/indian-express';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient, private env: EnvService) {

  }

  newsServiceURL: string = this.env.enableDebug ? "http://localhost:4500/v1/api/news/" : "https://scrap-node.onrender.com/v1/api/news/";

  _constructURL(p1: string, p2: string, path: string) {
    console.log(this.env.enableDebug)
    const url = new URL(path, this.newsServiceURL);

    url.searchParams.append('url', p1)
    url.searchParams.append('source', p2);

    return url.toString();
  }

  getNews(url: string, source: string): Observable<News> {
    const newsURL = this._constructURL(url, source, "today");
    return this.http.get<News>(newsURL);
  }

  getMoreNews(url: string, source: string): Observable<News> {
    const newsURL = this._constructURL(url, source, "today");
    return this.http.get<News>(newsURL);
  }

  getNewsContent(url: string, source: string): Observable<any> {
    const newsURL = this._constructURL(url, source, "content");
    return this.http.get(newsURL);
  }
}
