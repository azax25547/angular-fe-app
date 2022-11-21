import { IndianExpress } from './../indian-express';
import { Component } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  error: any;
  news: IndianExpress | undefined;
  constructor(private ns: NewsService) {

  }

  getNews() {
    this.ns.getNews()
      .subscribe({
        next: (data: IndianExpress) => { this.news = { ...data }; console.log(data) },
        error: er => this.error = er
      });
  }

  clear() {
    this.error = "";
    this.news = undefined;
  }

}
