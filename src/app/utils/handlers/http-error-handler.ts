import { ApiMessageResponse } from './../../models/api/api-message-response';
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export class HttpErrorHandler {

    /**
     * Handles HTTP request errors.
     * @param error The HTTP error response provided by HttpClient.
     * @returns An Observable that always throws an error with a customized message.
     */
    static handleHttpError( httpError: HttpErrorResponse ) {
        let errorMessage = `An unknown error ocurred. ${httpError.error}`;
        if ( httpError.error && (httpError.error as ApiMessageResponse).message ) {
            errorMessage = (httpError.error as ApiMessageResponse).message;
        }
        else if ( httpError.error && httpError.error instanceof ErrorEvent )
            errorMessage = `Client side or network error: ${httpError.error.message}`;
        else if ( httpError instanceof ProgressEvent ) 
            errorMessage = 'Internal server error';
        else
            errorMessage = httpError.status ? `Error ${httpError.status} - ${httpError.statusText} : ${httpError.error.message}`: errorMessage;
        return throwError ( () => new Error(errorMessage) );
    }
}