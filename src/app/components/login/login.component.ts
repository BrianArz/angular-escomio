import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Modules
import { Credentials } from '../../models/user/user-credentials';
import { NavbarComponent } from '../navbar/navbar.component';

// Services
import { HealthService } from './../../services/health/health-service';
import { AuthService } from '../../services/auth/auth-service';
import { RasaService } from '../../services/rasa/rasa-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  providers: [AuthService, HealthService, RasaService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  // Variables
  userLogin: FormGroup;
  serviceVersion: string = '';
  credentials = {} as Credentials;
  responseMessage: string = '';
  idToken: string = '';
  authorizedReponseMessage = '';
  testQuestionResponseMessage: string = '';

  // Constructor with dependency injections
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private raseService: RasaService,
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

        // Waits half a second
        setTimeout(() => {
          this.authorizedWelcome();
        }, 500);
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
  authorizedWelcome() {
    this.authService.authorizedHelloWorld().subscribe({
      next: (response) => {
        this.authorizedReponseMessage = response.message;

        // Waits half a second
        setTimeout(() => {
          this.testQuestion('Sender1', 'cual es tu funcion?');
        }, 500);
      },
      error: (error) => {
        this.authorizedReponseMessage = error.message;
        console.log(error.message);
      }
    });
  }

  /**
   * Calls test question endpoint
   * @param token User access token
   */
  testQuestion(sender: string, message: string) {
    this.raseService.testQuestion(sender, message).subscribe({
      next: (response) => {
        this.testQuestionResponseMessage = `Rasa Response: ${response.text}`;
      },
      error: (error) => {
        this.testQuestionResponseMessage = error.message;
        console.log(error.message);
      }
    })
  }

  /**
   * Cleans string view variables
   */
  clearView() {
    this.responseMessage = '';
    this.authorizedReponseMessage = '';
    this.testQuestionResponseMessage = '';
  }
}
