import { Component } from '@angular/core';
import { ChatComponent } from '../../components/chat/chat.component';
import { CommonModule } from '@angular/common';

interface Conversation {
  id: string;
  text: string;
}

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [ChatComponent, CommonModule],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.css'
})
export class ChatLayoutComponent {

  constructor (
  ) {}

  hasSidebar = false;

  activeConversationIndex: number | null = null;
  selectedConversationId: string | null = null;

  isNewConversation = false;

  conversations = [
    { id: '1', text: '¿Cómo estás hoy, ESCOM...'},
    { id: '2', text: '¿Cómo estás hoy, ESCOM...'},
    { id: '3', text: '¿Cómo estás hoy, ESCOM...'},
    { id: '4', text: '¿Cómo estás hoy, ESCOM...'}
  ];

  showSidebar() {
    this.hasSidebar = !this.hasSidebar;
  }

  closeSidebar() {
    if (window.innerWidth < 768 && this.hasSidebar) {
      this.hasSidebar = false;
    }
  }

  selectConversation(index: number) {
    this.activeConversationIndex = index;
    this.selectedConversationId = this.conversations[index].id;
    this.isNewConversation = false;
  }

  startNewConversation() {
    this.activeConversationIndex = null;
    this.selectedConversationId = null;
    this.isNewConversation = true;
  }

  addNewConversation(conversation: Conversation) {
    this.conversations.push(conversation);
    this.selectConversation(this.conversations.length - 1);
  }

}
