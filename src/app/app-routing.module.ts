import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { NewsContentComponent } from './news-content/news-content.component';

const routes: Routes = [
  { path: 'news', component: NewsComponent, title: 'My Project - News' },
  { path: 'home', component: HomeComponent },
  { path: 'news/:title/:src/:url', component: NewsContentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
