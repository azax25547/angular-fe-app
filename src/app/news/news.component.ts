import { News } from '../interface/indian-express';
import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  error: any;
  news: News | undefined;
  isLoading: boolean = false;
  selectedNewsService: string = "";
  pageNumber: number = 1;
  formModal: any;


  constructor(private ns: NewsService) {

  }


  private _getNews(newsService: string) {
    this.isLoading = true;
    this.news = undefined;
    this.ns.getNews(newsService)
      .subscribe({
        next: (data: News) => { this.news = data; this.isLoading = false },
        error: er => { this.error = er; this.isLoading = false; }
      });
  }

  private _getMoreNews(selectedNewsService: string, page: number) {
    this.news = undefined;
    this.isLoading = true;
    this.ns.getMoreNews(selectedNewsService, page)
      .subscribe({
        next: (data: News) => { this.news = data; this.isLoading = false; },
        error: er => { this.error = er; this.isLoading = false; }
      })
  }

  checkNews(): boolean {
    return this.news?.success ? false : (this.error ? false : true);
  }

  clear() {
    this.error = "";
    this.news = undefined;
    this.pageNumber = 1;
    this.selectedNewsService = "";
  }

  onOptionSelect(event: any) {
    this.selectedNewsService = event.target.value;
    this._getNews(event.target.value);
    // console.log(event.target.value)
  }

  loadMore() {
    switch (this.selectedNewsService) {
      case "ie":
        this.pageNumber += 1;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      case "toi":
        this.pageNumber += 1;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      case "ht":
        this.pageNumber += 1;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      case "otv":
        this.pageNumber += 1;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      default: console.log(0)
    }
  }

  readMore() {
  }

}
