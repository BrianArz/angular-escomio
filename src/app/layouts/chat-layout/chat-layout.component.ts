import { ApiMessageResponse } from './../../models/api/api-message-response';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent {

  constructor (
    private authService: AuthService
  ) {}

  hasSidebar = false;

  showSidebar() {
    this.hasSidebar = !this.hasSidebar;
  }

  closeSidebar() {
    if (window.innerWidth < 768 && this.hasSidebar) {
      this.hasSidebar = false;
    }
  }

  getAuthorizeMessage() {
    this.authService.authorizedHelloWorld().subscribe({
      next: (response) => {
        console.log(response.message);
      }, 
      error: (response) => {
        console.log(response.message);
      }
    })
  }
}
