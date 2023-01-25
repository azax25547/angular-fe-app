import { Component, Input } from '@angular/core';
import { NewsContents } from '../interface/news-contents';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})



export class NewsModalComponent {

  @Input() newsTitle = '';
  @Input() newsContents: NewsContents | undefined;


  onClose() {
    this.newsTitle = '';
    this.newsContents = undefined;
  }
}
