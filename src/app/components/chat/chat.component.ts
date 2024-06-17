import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConversationResponse } from '../../models/rasa/conversation-response';
import { GetConversationMessagesResponse } from '../../models/rasa/get-conversation-messages-response';
import { Message } from '../../models/rasa/get-conversation-messages-response';
import { ConversationIdRequest } from '../../models/rasa/conversation-id-request';
import { RasaService } from '../../services/rasa/rasa-service';
import { QuestionRequest } from './../../models/rasa/question-request';
import { CreateConversationResponse } from '../../models/rasa/create-conversation-response';
import { AddMessageRequest } from '../../models/rasa/add-message-request';
import { SweetAlertService } from '../../services/sweetalert/sweetalert-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnChanges, AfterViewInit {

  constructor(
    private rasaService: RasaService,
    private sweetService: SweetAlertService
  ) {}

  @Input() conversationId: string | null = null;
  @Input() isNewConversation: boolean = false;
  @Output() newConversation = new EventEmitter<ConversationResponse>();
  @ViewChild('chatsInnerContainer') chatsInnerContainer!: ElementRef;

  messages: Message[] = [];
  question: string = '';
  isLoading: boolean = false;
  isAsking: boolean = false;

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
    const request: ConversationIdRequest = {
      conversation_id: conversationId
    }

    this.rasaService.getConversationMessages(request).subscribe({
      next: (response: GetConversationMessagesResponse) => {
        this.messages = response.messages;
      },
      error: error => {
        this.sweetService.error(error);
      }
    });
    setTimeout(() => this.scrollToBottom(), 0);
  }

  sendMessage() {
    if (this.question.trim()) {

      this.isAsking = true;
      if (this.isNewConversation) {
        const request: QuestionRequest = {
          question: this.question
        }

        this.rasaService.createConversation(request).subscribe({
          next: (response: CreateConversationResponse) => {

            const newConvserationId = response.conversation_id;
            const newConversationName = response.conversation_name;
            
            const newConversation: ConversationResponse = { 
              id: newConvserationId, 
              name: newConversationName 
            };
            this.newConversation.emit(newConversation);
            
            const newMessage: Message = {
              asked_question: this.question,
              question_answer: response.response,
              conversation_id: response.conversation_id,
              message_id: response.message_id,
              creation_datetime: '',
              grade: ''
            };
            
            this.messages = [newMessage];
            this.isNewConversation = false;            
            this.conversationId = newConvserationId;

            this.question = '';
            this.isAsking = false;
            setTimeout(() => this.scrollToBottom(), 0);
          },   
          error: error => {
            this.isAsking = false;
            this.sweetService.error(error);
          }
        });
      } else if (this.conversationId) {
        const request: AddMessageRequest = {
          conversation_id: this.conversationId ?? '',
          question: this.question
        };

        this.rasaService.addMessage(request).subscribe({
          next: (response: CreateConversationResponse) => {

            const newMessage: Message = { 
              asked_question: this.question, 
              question_answer: response.response, 
              conversation_id: response.conversation_id, 
              message_id: response.message_id, 
              creation_datetime: '', 
              grade: '' 
            }

            this.messages.push(newMessage);
            this.question = '';
            this.isAsking = false;
            setTimeout(() => this.scrollToBottom(), 0);
          },
          error: error => {
            this.isAsking = false;
            this.sweetService.error(error);
          }
        });
      }
    }
  }
}
