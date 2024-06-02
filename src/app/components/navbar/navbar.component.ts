import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  constructor(
    private authService: AuthService
  ) {}

  get isLogged() {
    return this.authService.isLogged();
  }

}
