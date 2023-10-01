import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HomeComponent } from './home/home.component';
import { EnvServiceProvider } from './services/env.service.provider';
import { NewsContentComponent } from './news-content/news-content.component';
import { FinanceComponent } from './finance/finance.component';
import { ChartComponent } from './chart/chart.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { ExpenseformComponent } from './finance/expenseform/expenseform.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewsComponent,
    SpinnerComponent,
    HomeComponent,
    NewsContentComponent,
    FinanceComponent,
    ChartComponent,
    LoginComponent,
    ModalComponent,
    ExpenseformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
