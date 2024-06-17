import { Component, OnInit } from '@angular/core';
import { ChatComponent } from '../../components/chat/chat.component';
import { CommonModule } from '@angular/common';

import { ConversationResponse } from './../../models/rasa/conversation-response';
import { RasaService } from '../../services/rasa/rasa-service';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [ChatComponent, CommonModule],
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})
export class ChatLayoutComponent implements OnInit {

  constructor(private rasaService: RasaService) {}

  hasSidebar = false;

  activeConversationIndex: number | null = null;
  selectedConversationId: string | null = null;

  isNewConversation = false;

  conversations: ConversationResponse[] = [];

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations() {
    this.rasaService.getConversations().subscribe({
      next: (conversations: ConversationResponse[]) => {
        this.conversations = conversations;
      }
    });
  }


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

  addNewConversation(conversation: ConversationResponse) {
    this.conversations.push(conversation);
    this.selectConversation(this.conversations.length - 1);
  }
}
