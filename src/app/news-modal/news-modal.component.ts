import { Component, Output, EventEmitter } from '@angular/core';
import { NewsContents } from '../interface/news-contents';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css'],
})
export class NewsModalComponent {
  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.closeModalEvent.emit(true);
  }
}
