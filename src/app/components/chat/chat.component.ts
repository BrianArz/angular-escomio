import { 
  Component, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnChanges, 
  Output, 
  SimpleChanges, 
  ViewChild, 
  AfterViewInit 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConversationResponse } from '../../models/rasa/conversation-response';
import { GetConversationMessagesResponse } from '../../models/rasa/get-conversation-messages-response';
import { UpdateMessageGradeRequest } from './../../models/rasa/update-message-grade-request';
import { Message } from '../../models/rasa/get-conversation-messages-response';
import { ConversationIdRequest } from '../../models/rasa/conversation-id-request';
import { RasaService } from '../../services/rasa/rasa-service';
import { QuestionRequest } from './../../models/rasa/question-request';
import { CreateConversationResponse } from '../../models/rasa/create-conversation-response';
import { AddMessageRequest } from '../../models/rasa/add-message-request';
import { SweetAlertService } from '../../services/sweetalert/sweetalert-service';
import { ApiMessageResponse } from '../../models/api/api-message-response';
import { SuggestByChatRequest } from '../../models/rasa/suggest-by-chat-request';

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
  @Output() newConversation = new EventEmitter<ConversationResponse>();
  @ViewChild('chatsInnerContainer') chatsInnerContainer!: ElementRef;

  messages: Message[] = [];
  showAnswerOptions: { [key: string]: boolean } = {};
  question: string = '';
  isLoading: boolean = false;
  isAsking: boolean = false;

  constructor(
    private rasaService: RasaService,
    private sweetService: SweetAlertService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conversationId'] && this.conversationId) {
      this.loadMessages(this.conversationId);
    } else if (this.isNewConversation) {
      this.messages = [];
    }
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
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

  private loadMessages(conversationId: string): void {
    const request: ConversationIdRequest = { conversation_id: conversationId };

    this.rasaService.getConversationMessages(request).subscribe({
      next: (response: GetConversationMessagesResponse) => {
        this.messages = response.messages;
        this.initializeShowAnswerOptions();
      },
      error: error => {
        this.sweetService.error(error);
      }
    });
    setTimeout(() => this.scrollToBottom(), 0);
  }

  private initializeShowAnswerOptions(): void {
    this.messages.forEach(message => {
      this.showAnswerOptions[message.message_id] = message.grade === 'Sin calificar';
    });
  }

  private updateShowAnswerOptions(message: Message): void {
    this.showAnswerOptions[message.message_id] = message.grade === 'Sin calificar';
  }

  sendMessage(): void {
    if (this.question.trim()) {
      this.isAsking = true;

      if (this.conversationId) {
        this.addMessageToConversation();
      }else {
        this.createNewConversation();
      }
    }
  }

  private createNewConversation(): void {
    const request: QuestionRequest = { question: this.question };

    this.rasaService.createConversation(request).subscribe({
      next: (response: CreateConversationResponse) => {
        const newConversation: ConversationResponse = {
          id: response.conversation_id,
          name: response.conversation_name
        };
        this.newConversation.emit(newConversation);

        const newMessage: Message = {
          asked_question: this.question,
          question_answer: response.response,
          conversation_id: response.conversation_id,
          message_id: response.message_id,
          creation_datetime: '',
          grade: 'Sin calificar'
        };

        this.messages = [newMessage];
        this.isNewConversation = false;
        this.conversationId = response.conversation_id;
        this.updateShowAnswerOptions(newMessage);
        this.resetQuestionInput();
        this.scrollToBottom();
      },
      error: error => {
        this.isAsking = false;
        this.sweetService.error(error);
      }
    });
  }

  private addMessageToConversation(): void {
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
          grade: 'Sin calificar'
        };

        this.messages.push(newMessage);
        this.updateShowAnswerOptions(newMessage);
        this.resetQuestionInput();
        this.scrollToBottom();
      },
      error: error => {
        this.isAsking = false;
        this.sweetService.error(error);
      }
    });
  }

  private resetQuestionInput(): void {
    this.question = '';
    this.isAsking = false;
  }

  reportAnswer(messageId: string, newGrade: string): void {
    const request: UpdateMessageGradeRequest = {
      conversation_id: this.conversationId ?? '',
      message_id: messageId,
      new_grade: newGrade
    };

    this.rasaService.updateMessageGrade(request).subscribe({
      next: (response: ApiMessageResponse) => {
        this.sweetService.success(response.message);
        this.showAnswerOptions[messageId] = false;
      },
      error: error => {
        this.sweetService.error(error);
      }
    });
  }

  suggestTrainingAlert(messageId: string){
    this.sweetService.confirmationAlert(
      "Sugerir entrenamiento", 
      "Esta acción le dirá a los administradores de Escomio que quieres que esta pregunta sea agregada a la base de conocimiento.",
      "Sugerir", 
      "Cancelar"
    ).then((result) => {
      if (result.isConfirmed) {
        this.suggestTraining(messageId);
      }
    })
  }

  suggestTraining(messageId: string) {
    const request: SuggestByChatRequest = {
      conversation_id: this.conversationId ?? '',
      message_id: messageId
    }

    this.rasaService.suggestByChat(request).subscribe({
      next: (response: ApiMessageResponse) => {
        this.sweetService.success(response.message);
        this.showAnswerOptions[messageId] = false;
      },
      error: error => {
        this.sweetService.error(error);
      }
    });
  }
}
