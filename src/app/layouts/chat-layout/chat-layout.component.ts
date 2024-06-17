import { ConversationIdRequest } from './../../models/rasa/conversation-id-request';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from '../../components/chat/chat.component';
import { RasaService } from '../../services/rasa/rasa-service';
import { SweetAlertService } from '../../services/sweetalert/sweetalert-service';
import { ConversationResponse } from './../../models/rasa/conversation-response';
import { ApiMessageResponse } from '../../models/api/api-message-response';

@Component({
  selector: 'app-chat-layout',
  standalone: true,
  imports: [ChatComponent, CommonModule],
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.css']
})
export class ChatLayoutComponent implements OnInit {
  hasSidebar = false;
  activeConversationIndex: number | null = null;
  selectedConversationId: string | null = null;
  isNewConversation = false;
  conversations: ConversationResponse[] = [];

  constructor(
    private rasaService: RasaService,
    private sweetService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  private loadConversations(): void {
    this.rasaService.getConversations().subscribe({
      next: (conversations: ConversationResponse[]) => {
        this.conversations = conversations || [];
      },
      error: (error) => {
        this.sweetService.error(error);
      }
    });
  }

  toggleSidebar(): void {
    this.hasSidebar = !this.hasSidebar;
  }

  closeSidebar(): void {
    if (window.innerWidth < 768 && this.hasSidebar) {
      this.hasSidebar = false;
    }
  }

  selectConversation(index: number): void {
    this.activeConversationIndex = index;
    this.selectedConversationId = this.conversations[index]?.id ?? null;
    this.isNewConversation = false;
    this.closeSidebar();
  }

  startNewConversation(): void {
    this.activeConversationIndex = null;
    this.selectedConversationId = null;
    this.isNewConversation = true;
    this.closeSidebar();
  }

  addNewConversation(conversation: ConversationResponse): void {
    if (this.conversations) {
      this.conversations.push(conversation);
      this.selectConversation(this.conversations.length - 1);
    } else {
      this.sweetService.error('Conversations array is not initialized');
    }
  }

  confirmDeleteConversation(): void {
    this.sweetService.dangerAlert(
      '¿Estás seguro de querer eliminar la conversación?',
      'Esta acción es irreversible',
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.deleteConversation(this.selectedConversationId ?? '');
      }
    });
  }

  private deleteConversation(conversationId: string): void {
    const request: ConversationIdRequest = { conversation_id: conversationId };

    this.rasaService.deleteConversation(request).subscribe({
      next: (response: ApiMessageResponse) => {
        this.sweetService.success(response.message);
        this.removeConversationFromList(conversationId);
      },
      error: (error) => {
        this.sweetService.error(error);
      }
    });
  }

  private removeConversationFromList(conversationId: string): void {
    const index = this.conversations.findIndex(conv => conv.id === conversationId);
    if (index !== -1) {
      this.conversations.splice(index, 1);
      this.resetConversationState();
    }
  }

  private resetConversationState(): void {
    this.activeConversationIndex = null;
    this.selectedConversationId = null;
    this.isNewConversation = true;
  }
}
