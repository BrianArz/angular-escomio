import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from '../../services/auth/auth-service';

import * as ROUTES from '../../utils/protocols/common.protocols';

@Injectable({providedIn: 'root'})

export class LoginGuard  {

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLogged()){
      this.router.navigate([ROUTES.ESCOMIO]);
      return false;
    }
    return true;
  }
}