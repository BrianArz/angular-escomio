import { fileURLToPath } from 'node:url';
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
    private apiUri: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Gets test question from rasa server
     * @param token User access token
     * @returns Test question response object
     */
    public testQuestion(sender: string, message: string): Observable<any> {

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
