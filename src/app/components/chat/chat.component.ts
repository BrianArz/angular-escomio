import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Message {
  question: string;
  answer: string;
}

interface Conversation {
  id: string;
  text: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges, AfterViewInit {

  @Input() conversationId: string | null = null;
  @Input() isNewConversation: boolean = false;
  @Output() newConversation = new EventEmitter<Conversation>();
  @ViewChild('chatsInnerContainer') chatsInnerContainer!: ElementRef;

  messages: Message[] = [];
  question: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversationId'] && this.conversationId) {
      this.loadMessages(this.conversationId);
    } else if (this.isNewConversation) {
      this.messages = [];
    }
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    if (this.chatsInnerContainer) {
      this.chatsInnerContainer.nativeElement.scrollTop = this.chatsInnerContainer.nativeElement.scrollHeight;
    }
  }

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  loadMessages(conversationId: string) {
    const simulatedMessages: Message[] = [
      { question: '¿Cómo estás hoy, ESCOMIO?', answer: '¡Excelente! Listo para ayudarte en lo que necesites.' },
      { question: '¿Qué tipo de consultas resuelves?', answer: 'Información referente al Departamento de Gestión Escolar.' },
      { question: '¿Dónde debo entregar mi solicitud de beca?', answer: 'Lo siento, pero no puedo responder a esa información; no corresponde al Departamento de Gestión Escolar.' },
      { question: '¿Dónde debo entregar mi solicitud de beca?', answer: 'Lo siento, pero no puedo responder a esa información; no corresponde al Departamento de Gestión Escolar.' },
      { question: '¿Dónde debo entregar mi solicitud de beca?', answer: 'Lo siento, pero no puedo responder a esa información; no corresponde al Departamento de Gestión Escolar.' },
      { question: '¿Dónde debo entregar mi solicitud de beca?', answer: 'Lo siento, pero no puedo responder a esa información; no corresponde al Departamento de Gestión Escolar.' },
      { question: '¿Dónde debo entregar mi solicitud de beca?', answer: 'Lo siento, pero no puedo responder a esa información; no corresponde al Departamento de Gestión Escolar.' },
      { question: '¿Dónde debo entregar mi solicitud de beca?', answer: 'Lo siento, pero no puedo responder a esa información; no corresponde al Departamento de Gestión Escolar.' },

    ];
    this.messages = simulatedMessages;
    setTimeout(() => this.scrollToBottom(), 0);
  }

  sendMessage() {
    if (this.question.trim()) {
      const newMessage: Message = { question: this.question, answer: 'Respuesta simulada.' };
      this.messages.push(newMessage);

      if (this.conversationId) {
        this.question = '';
        setTimeout(() => this.scrollToBottom(), 0);

      } else if (this.isNewConversation) {
        const newConversationId = 'new-conversation-id';
        const newConversation: Conversation = { id: newConversationId, text: this.question };
        this.newConversation.emit(newConversation);
        this.conversationId = newConversationId;
        this.messages = [newMessage];
        this.isNewConversation = false;
        this.question = '';
        setTimeout(() => this.scrollToBottom(), 0);
      }
    }
  }
}
