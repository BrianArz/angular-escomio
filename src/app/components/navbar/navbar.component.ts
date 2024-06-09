import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth/auth-service';

import * as APP from '../../utils/protocols/common.protocols';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  chatRoute: string = APP.ESCOMIO;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate([APP.WELCOME]);
  }

  get isLogged() {
    return this.authService.isLogged();
  }

}
