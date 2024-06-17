import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler } from '../../utils/handlers/http-error-handler';

import { ConversationResponse } from '../../models/rasa/conversation-response';
import { GetConversationMessagesResponse } from '../../models/rasa/get-conversation-messages-response';
import { ConversationIdRequest } from '../../models/rasa/conversation-id-request';
import { QuestionRequest } from '../../models/rasa/question-request';
import { CreateConversationResponse } from '../../models/rasa/create-conversation-response';
import { AddMessageRequest } from '../../models/rasa/add-message-request';

import * as API from '../../utils/protocols/api.protocols';


@Injectable({
    providedIn: 'root'
})
export class RasaService {

    private apiUri: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient,
    ) { }

    public getConversations(): Observable<ConversationResponse[]> {
        const url = this.formApiUrl(API.GET_CONVERSATIONS)
        return this.http.get<{ conversations: ConversationResponse[] }>(url, { withCredentials: true }).pipe(
            map(response => response.conversations),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

    public getConversationMessages(conversationIdRequest: ConversationIdRequest): Observable<GetConversationMessagesResponse> {
        const url = this.formApiUrl(API.GET_CONVERSATIONS_MESSAGES);
        return this.http.post<GetConversationMessagesResponse>(url, conversationIdRequest, { withCredentials: true} ).pipe(
            map(response => response), 
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

    public createConversation(questionRequest: QuestionRequest): Observable<CreateConversationResponse> {
        const url = this.formApiUrl(API.CREATE_CONVERSATION);
        return this.http.post<CreateConversationResponse>(url, questionRequest, { withCredentials: true }).pipe(
            map(response => response),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

    public addMessage(addMessageRequest: AddMessageRequest): Observable<CreateConversationResponse> {
        const url = this.formApiUrl(API.ADD_MESSAGE);
        return this.http.put<CreateConversationResponse>(url, addMessageRequest, { withCredentials: true }).pipe(
            map(response => response),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

    private formApiUrl(endpoint: string): string{
        return `${this.apiUri}/${endpoint}`;
    }
}
