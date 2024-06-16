import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  message: string = '';

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey){
      event.preventDefault()
      this.sendMessage()
    }
  }

  sendMessage() {
    console.log(this.message);
    this.message = '';
  }

}