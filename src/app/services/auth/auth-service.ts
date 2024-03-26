import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    private apiUrl: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient,
    ) { }

    /**
     * Logs into api using email and password
     * @param credentials User email and password
     */

    public login(credentials: Credentials): Observable<any> {
        return this.http.post<SignInResponse>(this.apiUrl + "/" + API.LOGIN, credentials).pipe(
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

     /**
   * Gets authenticated welcome from server
   * @param token User access token
   * @returns Authenticated welcome message
   */
     public authorizedHelloWorld(token: string): Observable<any> {
        const headers = { 'Authorization': `Bearer ${token}` }
        return this.http.get<ApiMessageResponse>(this.apiUrl + "/" + API.AUTHORIZED_HELLO_WORLD, { headers });
    }
}

