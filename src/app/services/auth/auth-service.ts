import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Models imports
import { Credentials } from '../../models/user/user-credentials';
import { SignInResponse } from '../../models/auth/signin-response';
import { ApiMessageResponse } from '../../models/api/api-message-response'

// Protocols imports
import * as API from '../../utils/protocols/api.protocols';

// Utils
import { environment } from '../../../environments/environment';
import { HttpErrorHandler } from '../../utils/handlers/http-error-handler';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //Gets API full url from api protocols
    private apiUri: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Logs into api using email and password
     * @param credentials User email and password
     */
    public login(credentials: Credentials): Observable<SignInResponse> {
        const url = this.formApiUrl(API.LOGIN)
        return this.http.post<SignInResponse>(url, credentials, { withCredentials: true }).pipe(
            tap(response => {
                this.saveExpirationTime(response.expires_in);
            }),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

     /**
   * Gets authenticated welcome from server
   * @param token User access token
   * @returns Authenticated welcome message
   */
     public authorizedHelloWorld(): Observable<any> {
        const url = this.formApiUrl(API.AUTHORIZED_HELLO_WORLD)
        return this.http.get<ApiMessageResponse>(url, { withCredentials: true }).pipe(
            catchError(error => HttpErrorHandler.handleHttpError(error))
          );
    }

    /**
     * Form auth service endpoints complete url
     * @param endpoint Individual endpoint route
     * @returns Full url string
     */
    private formApiUrl(endpoint:string): string{
        return `${this.apiUri}/${endpoint}`;
    }

    /**
     * Saves token expiration time in local storage
     * @param expiresIn Token expiration time in seconds
     */
    public saveExpirationTime(expiresIn: number){
        localStorage.setItem(API.EXPIRES_IN, expiresIn.toString());
    }

    /**
     * Verifies if local storage has expiration time value
     * @returns True if there's expiration time
     */
    public isLogged() {
        const expiresIn = localStorage.getItem(API.EXPIRES_IN);
        return !!expiresIn;
    }
}

