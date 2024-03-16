import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuth: boolean = false;
  reloadHeader: any;
  constructor(
    private auth: AuthService,
    private ms: ModalService,
    private router: Router
  ) {
    this.reloadHeader = this.ms.notifyParent$.subscribe((d) => {
      if (d === 'login') this.isAuth = true;
      else if (d === 'logout') this.isAuth = false;
    });
  }

  logout() {
    console.log('Logout');
    this.ms.notifyParent('logout');
    this.auth.logoutUser();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.reloadHeader.unsubscribe();
  }
}
