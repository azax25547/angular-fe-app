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
  isLoading: boolean = false;

  constructor(private ns: NewsService) {

  }

  getNews() {
    this.isLoading = true;
    this.ns.getNews()
      .subscribe({
        next: (data: IndianExpress) => { this.news = data; this.isLoading = false },
        error: er => this.error = er
      });
  }

  clear() {
    this.error = "";
    this.news = undefined;
  }

}
