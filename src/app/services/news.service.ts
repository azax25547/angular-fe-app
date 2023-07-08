import { News } from '../interface/news';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  newsServiceProvider: string = "";
  newsServiceProviderBaseURL: string= "";
  news!:News;
  page:number = 0;
  
  constructor(private http: HttpClient, private env: EnvService) {

  }

  newsServiceURL: string = this.env.enableDebug ? "http://localhost:4500/v1/api/news/" : "https://scrap-node.onrender.com/v1/api/news/";

  _constructURL(p1: string, p2: string, path: string) {
    const url = new URL(path, this.newsServiceURL);

    url.searchParams.append('url', p1)
    url.searchParams.append('source', p2);
    return url.toString();
  }

  _subscribeNews(ns:Observable<News>) {
    ns.subscribe({
      next: (data: News) => {
          this.news = data
        },
        error: er => { console.log(er) }
    })
  }

  getNews(url: string, source: string, isLoadMore: boolean): Observable<News> {
    const newsURL = this._constructURL(url, source, "today");
    if(!this.news || this.newsServiceProvider !== source || isLoadMore){
      this._subscribeNews(this.http.get<News>(newsURL))
      if(isLoadMore)
        this.page = Number(url.match(/\d+/)?.at(0)?.toString());
    }
    this.newsServiceProvider = source;
    this.newsServiceProviderBaseURL = url;
    
    return this.http.get<News>(newsURL);
  }

  getNewsContent(url: string, source: string): Observable<any> {
    const newsURL = this._constructURL(url, source, "content");
    return this.http.get(newsURL);
  }
}
