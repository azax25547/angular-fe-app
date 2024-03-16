import { Component } from '@angular/core';
import { User } from '../interface/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: any;
  error: any;
  isLoading: boolean = false;

  constructor() {}

  ngOnInit() {
    // let userData: any = JSON.parse(sessionStorage.getItem('user') || '{}');
    // if (Object.keys(userData).length !== 0) {
    //   this.user = userData;
    // } else {
    //   this.us
    //     .getUserDetailOne('b0075c81-ab19-44fc-bae8-f7f1d3335899')
    //     .subscribe({
    //       next: (data: any) =>
    //         sessionStorage.setItem('user', JSON.stringify(data)),
    //       error: (err) => (this.error = err),
    //     });
    // }
  }
}
