import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';
import { RasaService } from '../../services/rasa/rasa-service';
import { SweetAlertService } from '../../services/sweetalert/sweetalert-service';
import { ConversationResponse } from './../../models/rasa/conversation-response';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [ChatComponent, CommonModule],
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})
export class ChatLayoutComponent implements OnInit {

  constructor(
    private rasaService: RasaService,
    private sweetService: SweetAlertService
  ) {}

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
        this.conversations = conversations || [];
      },
      error: error => {
        this.sweetService.error(error);
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
    this.selectedConversationId = this.conversations[index]?.id ?? null;
    this.isNewConversation = false;
    this.closeSidebar();
  }

  startNewConversation() {
    this.activeConversationIndex = null;
    this.selectedConversationId = null;
    this.isNewConversation = true;
    this.closeSidebar();
  }

  addNewConversation(conversation: ConversationResponse) {
    if (this.conversations) {
      this.conversations.push(conversation);
      this.selectConversation(this.conversations.length - 1);
    } else {
      console.error('Conversations array is not initialized');
    }
  }
}