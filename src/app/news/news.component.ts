import { News } from '../interface/news';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import getNewsURL from '../utils/getNewsURL';

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
  pageNumber: number = 0;
  formModal: any;

  newsTitle: string = 'Hello There';
  newsContents: any = {};

  constructor(private ns: NewsService) {

  }

  private _checkIfErrorResponse(data: any) {
    if (!data.success || !data.status)
      this.error = "Unable to parse data from backend. Please contact Dev."
    return false
  }

  private _getNews(newsService: string) {
    this.isLoading = true;
    this.news = undefined;
    const newsURL: string = getNewsURL(newsService);
    this.ns.getNews(newsURL, newsService)
      .subscribe({
        next: (data: News) => {
          this.news = data; this.isLoading = false
        },
        error: er => { this.error = er; this.isLoading = false; }
      })
  }

  private _getPaginatedURL(newsService: string, newsURL: string, page: number): string {
    let baseNewsString = ``;
    switch (newsService) {

      case "ie":
        baseNewsString = `${newsURL}/page/${page}`;
        break;
      case "otv":
        baseNewsString = `${newsURL}/${page}`;
        break;
      case "toi":
        baseNewsString = `${newsURL}/${page}`;
        break;
      case "ht":
        baseNewsString = `${newsURL}/page-${page}`;
        break;

      default: baseNewsString = `${newsURL}/page/${page}`
    }

    return baseNewsString;
  }

  private _getMoreNews(selectedNewsService: string, page: number) {
    this.news = undefined;
    this.isLoading = true;
    const newsURL = getNewsURL(selectedNewsService);

    const paginatedURL = this._getPaginatedURL(selectedNewsService, newsURL, page);

    this.ns.getMoreNews(paginatedURL, selectedNewsService)
      .subscribe({
        next: (data: News) => {
          this.news = data; this.isLoading = false;
        },
        error: er => { this.error = er; this.isLoading = false; }
      })
  }



  checkNews(): boolean {
    return this.news?.success ? false : (this.error ? false : true);
  }

  clear() {
    this.error = "";
    this.news = undefined;
    this.pageNumber = 0;
    this.selectedNewsService = "";
  }

  onOptionSelect(newsType: string) {

    if (newsType === this.selectedNewsService) {
      if (this.news)
        return
    }

    this.selectedNewsService = newsType;
    this._getNews(newsType);
    // c11onsole.log(event.target.value)
  }

  loadMore() {
    switch (this.selectedNewsService) {
      case "ie":
        this.pageNumber += 2;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      case "toi":
        this.pageNumber += 2;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      case "ht":
        this.pageNumber += 2;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      case "otv":
        this.pageNumber += 15;
        this._getMoreNews(this.selectedNewsService, this.pageNumber)
        break;

      default: console.log(0)
    }
  }

  // readMore(news: any) {
  //   this.newsTitle = news.news
  //   this._getNewsContent(news.url, this.selectedNewsService);
  // }

}
