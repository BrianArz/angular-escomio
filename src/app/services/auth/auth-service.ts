import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { Credentials } from '../../models/user/user-credentials';
import { SignInResponse } from '../../models/auth/signin-response';
import { ApiMessageResponse } from '../../models/api/api-message-response'
import { SignUpRequest } from '../../models/auth/sign-up-request';
import { environment } from '../../../environments/environment';
import { HttpErrorHandler } from '../../utils/handlers/http-error-handler';

import * as API from '../../utils/protocols/api.protocols';
import { error } from 'console';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUri: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient,
    ) { }

    public login(credentials: Credentials): Observable<SignInResponse> {
        const url = this.formApiUrl(API.LOGIN)
        return this.http.post<SignInResponse>(url, credentials, { withCredentials: true }).pipe(
            tap(response => {
                this.saveExpirationTime(response.expires_in);
            }),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

    public signUp(signUpRequest: SignUpRequest): Observable<SignInResponse> {
        const url = this.formApiUrl(API.SIGN_UP)
        return this.http.post<SignInResponse>(url, signUpRequest, { withCredentials: true }).pipe(
            tap(response => {
                this.saveExpirationTime(response.expires_in);
            }),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        )
    }

    public authorizedHelloWorld(): Observable<any> {
        const url = this.formApiUrl(API.AUTHORIZED_HELLO_WORLD)
        return this.http.get<ApiMessageResponse>(url, { withCredentials: true }).pipe(
            catchError(error => HttpErrorHandler.handleHttpError(error))
        );
    }

    private formApiUrl(endpoint: string): string {
        return `${this.apiUri}/${endpoint}`;
    }

    public saveExpirationTime(expiresIn: number) {
        localStorage.setItem(API.EXPIRES_IN, expiresIn.toString());
    }

    public logout() {
        const url = this.formApiUrl(API.LOGOUT)
        return this.http.delete(url, { withCredentials: true }).pipe(
            finalize(() => {
                this.clearEscomioLocalStorage();
            })
        );
    }

    public isLogged() {
        const expiresIn = localStorage.getItem(API.EXPIRES_IN);
        return !!expiresIn;
    }

    public clearEscomioLocalStorage() {
        localStorage.removeItem(API.EXPIRES_IN);
    }

}

