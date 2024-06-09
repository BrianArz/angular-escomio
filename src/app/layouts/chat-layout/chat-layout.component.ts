import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent {
  hasSidebar = false;

  showSidebar() {
    this.hasSidebar = !this.hasSidebar;
  }

  closeSidebar() {
    if (window.innerWidth < 768 && this.hasSidebar) {
      this.hasSidebar = false;
    }
  }
}
