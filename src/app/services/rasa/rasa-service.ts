import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Models imports
import { TestQuestionResponse } from '../../models/rasa/test-question-response';

// Protocols imports
import * as API from '../../utils/protocols/api.protocols';

// Utils
import { environment } from '../../../environments/environment';
import { HttpErrorHandler } from '../../utils/handlers/http-error-handler';

@Injectable({
    providedIn: 'root'
})
export class RasaService {

    //Gets API full url from api protocols
    private apiUrl: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Gets test question from rasa server
     * @param token User access token
     * @returns Test question response object
     */
    public testQuestion(token: string, sender: string, message: string): Observable<any> {
        const headers = { 'Authorization': `Bearer ${token}`}
        const requestBody = {
            sender: sender,
            message: message
        }
        return this.http.post<TestQuestionResponse>(this.apiUrl + "/" + API.TEST_QUESTION, requestBody, { headers }).pipe(
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }
}
