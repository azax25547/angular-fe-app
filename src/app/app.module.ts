import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HomeComponent } from './home/home.component';
import { NewsModalComponent } from './news-modal/news-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsComponent,
    SpinnerComponent,
    HomeComponent,
    NewsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
