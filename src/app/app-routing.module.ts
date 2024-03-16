import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { FinanceComponent } from './finance/finance.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'news', component: NewsComponent, title: 'My Project - News' },
  { path: 'home', component: HomeComponent },
  { path: 'finance', component: FinanceComponent, canActivate: [AuthGuard] },
  { path: 'news/:title/:src/:url', component: NewsContentComponent },
  { path: 'auth', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
