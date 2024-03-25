import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Modules
import { Credentials } from '../../models/user/user-credentials';
import { NavbarComponent } from '../navbar/navbar.component';

// Services
import { HealthService } from './../../services/health/health-service';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  providers: [AuthService, HealthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  // Variables
  userLogin: FormGroup;
  serviceVersion: string = '';
  credentials = {} as Credentials;
  responseMessage: string = '';
  authorizedReponseMessage = '';

  // Constructor with dependency injections
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {
    this.userLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Calls login method and handles response
   */
  login() {
    this.clearView();

    this.credentials.email = this.userLogin.value.email;
    this.credentials.password = this.userLogin.value.password;

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.responseMessage = 'Login request completed sucessfully. Check console log';
        console.log(response);

        this.authorizedWelcome(response.id_token);
      },
      error: (error) => {
        this.responseMessage = 'Login request failed! Check console log';
        console.log(error.message);
      }
    })
  }

  /**
   * Calls authorized hello world endpoint
   * @param token User access token
   */
  authorizedWelcome(token: string) {
    this.authService.authorizedHelloWorld(token).subscribe({
      next: (response) => {
        this.authorizedReponseMessage = response.message;
      },
      error: (error) => {
        this.authorizedReponseMessage = error.message;
        console.log(error.message);
      }
    });
  }

  /**
   * Cleans string view variables
   */
  clearView() {
    this.responseMessage = '';
    this.authorizedReponseMessage = '';
  }
}
