import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { Credentials } from '../../models/user/user-credentials';
import { HealthService } from './../../services/health/health-service';
import { AuthService } from '../../services/auth/auth-service';
import { RasaService } from '../../services/rasa/rasa-service';
import { RefreshService } from '../../services/refresh/refresh-service';
import { LogoPanelComponent } from '../../shared/logo-panel/logo-panel.component';

import * as APP from '../../utils/protocols/common.protocols';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, LogoPanelComponent],
  providers: [AuthService, HealthService, RasaService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userLogin: FormGroup;
  credentials = {} as Credentials;
  passwordFieldType: string = 'password';

  isLoading: boolean = false;

  hasAlert: boolean = false;  
  responseMessage: string = '';

  createAccountRoute: string = APP.CREATE_ACCOUNT;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private refreshService: RefreshService,
    private router: Router
  ) {
    this.userLogin = this.formBuilder.group({
      email: ['', 
        [
          Validators.required, 
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')
        ]
      ],
      password: ['', 
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  login() {

    this.userLogin.markAllAsTouched(); 

    if (this.userLogin.invalid) {
      return;
    }

    this.hasAlert = false;
    this.isLoading = true;

    this.credentials.email = this.userLogin.value.email;
    this.credentials.password = this.userLogin.value.password;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
        const expiresInStorage = this.authService.getExpiresIn();
        if (!expiresInStorage  || !this.authService.isLogged()) {
          this.responseMessage = "No fue posible iniciar la sesión. Por favor intenta de nuevo.";
          return;
        }
        this.refreshService.start(expiresInStorage);
        this.router.navigate([APP.ESCOMIO]);
      },
      error: (response) => {
        this.isLoading = false;
        this.responseMessage = response.message;
        this.hasAlert = true;
      }
    })
  }

  togglePassword() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  get email() {
    return this.userLogin.get('email');
  }
  get password() {
    return this.userLogin.get('password');
  }
}
