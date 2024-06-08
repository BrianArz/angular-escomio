import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Credentials } from '../../models/user/user-credentials';
import { NavbarComponent } from '../navbar/navbar.component';
import { HealthService } from './../../services/health/health-service';
import { AuthService } from '../../services/auth/auth-service';
import { RasaService } from '../../services/rasa/rasa-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],
  providers: [AuthService, HealthService, RasaService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userLogin: FormGroup;
  credentials = {} as Credentials;
  passwordFieldType: string = 'password';

  isLoading: boolean = false;

  showAlert: boolean = false;  
  responseMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
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

    this.showAlert = false;
    this.isLoading = true;

    this.credentials.email = this.userLogin.value.email;
    this.credentials.password = this.userLogin.value.password;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (response) => {
        this.isLoading = false;
        this.responseMessage = response.message;
        this.showAlert = true;
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
