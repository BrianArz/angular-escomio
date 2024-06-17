import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler } from '../../utils/handlers/http-error-handler';

import { TestQuestionResponse } from '../../models/rasa/test-question-response';
import { ConversationResponse } from '../../models/rasa/conversation-response';
import { GetConversationMessagesResponse } from '../../models/rasa/get-conversation-messages-response';
import { ConversationIdRequest } from '../../models/rasa/conversation-id-request';

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

    public askRasa(sender: string, message: string): Observable<any> {

        const requestBody = {
            sender: sender,
            message: message
        }


        const url = this.formApiUrl(API.TEST_QUESTION)
        return this.http.post<TestQuestionResponse>(url, requestBody, { withCredentials: true }).pipe(
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

    private formApiUrl(endpoint: string): string{
        return `${this.apiUri}/${endpoint}`;
    }
}
