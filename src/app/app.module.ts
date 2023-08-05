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
import { EnvServiceProvider } from './services/env.service.provider';
import { NewsContentComponent } from './news-content/news-content.component';
import { FinanceComponent } from './finance/finance.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsComponent,
    SpinnerComponent,
    HomeComponent,
    NewsContentComponent,
    FinanceComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
