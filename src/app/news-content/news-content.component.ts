import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NewsService } from '../services/news.service';
import { NewsContents } from '../interface/news-contents';

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent {

  newsContents: NewsContents | undefined;
  error: any;
  newsServiceProvider: string = "";
  newsURL: string = "";
  newsTitle: string = "";

  constructor(private route: ActivatedRoute, private ns: NewsService) {

  }

  private _getNewsContent(url: string, selectedNewsService: string) {
    this.ns.getNewsContent(url, selectedNewsService)
      .subscribe({
        next: (data: any) => {
          if (data.success)
            this.newsContents = data;
        },
        error: er => { this.error = er }
      })
  }

  _readMore(params: any): void {
    this.newsServiceProvider = params.src;
    this.newsURL = params.url;
    this.newsTitle = params.title;

    this._getNewsContent(this.newsURL, this.newsServiceProvider);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._readMore(params);
    })


  }
}
