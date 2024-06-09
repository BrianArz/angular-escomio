import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { LogoPanelComponent } from '../../shared/logo-panel/logo-panel.component';

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

  passwordFieldType: string = "password";

  isLoading: boolean = false;

  hasAlert: boolean = false;
  responseMessage: string = '';
  
  loginRoute: string = APP.LOGIN;

  constructor(
    private formBuilder: FormBuilder,
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

    console.log("test");
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
