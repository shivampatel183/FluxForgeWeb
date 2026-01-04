import { Component } from '@angular/core';
import { CookieService } from '../../common/Services/cookie.servies';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  public userName: string | null = '';
  ngOnInit() {
    this.userName = localStorage.getItem('UserName');
  }
}
