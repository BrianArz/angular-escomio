import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { LogoPanelComponent } from '../../shared/logo-panel/logo-panel.component';
import { SignUpRequest } from '../../models/auth/sign-up-request';
import { AuthService } from './../../services/auth/auth-service';

import * as APP from '../../utils/protocols/common.protocols';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, LogoPanelComponent],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  createAccountForm!: FormGroup;
  signUpRequest = {} as SignUpRequest

  passwordFieldType: string = "password";

  isLoading: boolean = false;

  hasAlert: boolean = false;
  responseMessage: string = '';
  
  loginRoute: string = APP.LOGIN;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createAccountForm = this.formBuilder.group({
      username: ['', 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
          Validators.pattern('^[a-zA-Z0-9_]+$')
        ]
      ],
      escomId: ['', 
        [
          Validators.required,
          Validators.pattern('[0-9]*'),
          Validators.minLength(8),
          Validators.maxLength(15)
        ]
      ],
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
      ],
    })
  }

  createAccount() {

    this.createAccountForm.markAllAsTouched();

    if (this.createAccountForm.invalid)
      return;

    this.hasAlert = false;
    this.isLoading = true;

    this.signUpRequest.username = this.createAccountForm.value.username;
    this.signUpRequest.email = this.createAccountForm.value.email;
    this.signUpRequest.password = this.createAccountForm.value.password;
    this.signUpRequest.escom_id = this.createAccountForm.value.escomId;

    this.authService.signUp(this.signUpRequest).subscribe({
      next: () => {
        this.isLoading = false;
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

  get username() {
    return this.createAccountForm.get('username');
  }
  get escomId() {
    return this.createAccountForm.get('escomId');
  }
  get email() {
    return this.createAccountForm.get('email');
  }
  get password() {
    return this.createAccountForm.get('password');
  }
}
