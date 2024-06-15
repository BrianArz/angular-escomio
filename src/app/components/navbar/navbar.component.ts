import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth/auth-service';
import { RefreshService } from '../../services/refresh/refresh-service';

import * as APP from '../../utils/protocols/common.protocols';
import * as ROLES from '../../utils/protocols/roles.protocols';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  chatRoute: string = APP.ESCOMIO;

  admin: number = ROLES.ADMIN;
  user: number = ROLES.USER;

  constructor(
    private authService: AuthService,
    private refreshService: RefreshService,
    private router: Router
  ) {}

  logout() {
    this.refreshService.stop();
    this.authService.logout().subscribe();
    this.router.navigate([APP.WELCOME]);
  }

  get isLogged() {
    return this.authService.isLogged();
  }

  get username() {
    return this.authService.getUsername();
  }

  get role() {
    return this.authService.getRole();
  }

}
