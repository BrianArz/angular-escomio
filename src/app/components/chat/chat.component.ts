import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConversationResponse } from '../../models/rasa/conversation-response';
import { GetConversationMessagesResponse } from '../../models/rasa/get-conversation-messages-response';
import { Message } from '../../models/rasa/get-conversation-messages-response';
import { ConversationIdRequest } from '../../models/rasa/conversation-id-request';
import { RasaService } from '../../services/rasa/rasa-service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges, AfterViewInit {

  constructor(
    private rasaService: RasaService
  ) {}

  @Input() conversationId: string | null = null;
  @Input() isNewConversation: boolean = false;
  @Output() newConversation = new EventEmitter<ConversationResponse>();
  @ViewChild('chatsInnerContainer') chatsInnerContainer!: ElementRef;

  messages: Message[] = [];
  question: string = '';
  isLoading: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversationId'] && this.conversationId) {
      this.isLoading = true;
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

    const request: ConversationIdRequest = {
      conversation_id: conversationId
    }

    this.rasaService.getConversationMessages(request).subscribe({
      next: (response: GetConversationMessagesResponse) => {
        this.messages = response.messages;
        this.isLoading = false;
      },
      error: error => {

      }
    });
    setTimeout(() => this.scrollToBottom(), 0);
  }

  sendMessage() {
    if (this.question.trim()) {
      // const newMessage: Message = { asked_question: this.question, question_answer: 'Respuesta simulada.' };
      // this.messages.push(newMessage);

      // if (this.conversationId) {
      //   this.question = '';
      //   setTimeout(() => this.scrollToBottom(), 0);

      // } else if (this.isNewConversation) {
      //   const newConversationId = 'new-conversation-id';
      //   const newConversation: ConversationResponse = { id: newConversationId, name: this.question };
      //   this.newConversation.emit(newConversation);
      //   this.conversationId = newConversationId;
      //   this.messages = [newMessage];
      //   this.isNewConversation = false;
      //   this.question = '';
      //   setTimeout(() => this.scrollToBottom(), 0);
      // }
    }
  }
}
