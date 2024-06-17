import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

import { ConversationIdRequest } from './../../models/rasa/conversation-id-request';
import { ChatComponent } from '../../components/chat/chat.component';
import { RasaService } from '../../services/rasa/rasa-service';
import { SweetAlertService } from '../../services/sweetalert/sweetalert-service';
import { ConversationResponse } from './../../models/rasa/conversation-response';
import { ApiMessageResponse } from '../../models/api/api-message-response';
import { UpdateNameRequest } from '../../models/rasa/update-name-request';

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
    this.conversations.push(conversation);
    this.selectConversation(this.conversations.length - 1);
  }

  confirmDeleteConversation(conversationId: string | null): void {
    this.sweetService.dangerAlert(
      '¿Estás seguro de querer eliminar la conversación?',
      'Esta acción es irreversible',
      'Eliminar',
      'Cancelar'
    ).then((result) => {
      if (result.isConfirmed) {
        this.deleteConversation(conversationId ?? this.selectedConversationId ?? '');
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

  updateConversationName(conversationId: string | null): void {
    Swal.fire({
      title: 'Ingresa el nuevo nombre de la conversación',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'btn escomio-bg-saphire-blue escomio-txt-snow',
        cancelButton: 'btn escomio-bg-cyan-process escomio-txt-snow'
      },
      preConfirm: async (newName) => {
        const request: UpdateNameRequest = {
          conversation_id: conversationId ?? this.selectedConversationId ?? '',
          new_name: newName
        };
        try {
          const response = await firstValueFrom(this.rasaService.updateName(request));
          if (!response) {
            Swal.showValidationMessage('User not found');
          }
          return response;
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
          return null;
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.sweetService.success(result.value.message);
        this.loadConversations();
      }
    });
  }
}
