import { GetSuggestionsResponse } from './../../models/admin/get-suggestions-response';
import { AuthService } from './../auth/auth-service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable, catchError, map } from "rxjs";
import { HttpErrorHandler } from "../../utils/handlers/http-error-handler";

import { GetUsersResponse } from "../../models/admin/get-users-response";
import { RoleRequest } from "../../models/admin/role-request";

import * as API from '../../utils/protocols/api.protocols';
import { GetMessagesResponse } from '../../models/admin/get-messages-response';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private apiUri: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    public getUsers(): Observable<GetUsersResponse[]> {
        const url = this.formApiUrl(API.GET_USERS);
        const role = this.authService.getRole();
        const request: RoleRequest = { role : role};
        return this.http.post<GetUsersResponse[]>(url, request, { withCredentials: true }).pipe(
            map(response => response),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        );
    }

    public getMessages(): Observable<GetMessagesResponse[]> {
        const url = this.formApiUrl(API.GET_MESSAGES);
        const role = this.authService.getRole();
        const request: RoleRequest = { role : role};
        return this.http.post<GetMessagesResponse[]>(url, request, { withCredentials: true }).pipe(
            map(response => response),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        );
    }

    public getSuggestions(): Observable<GetSuggestionsResponse[]> {
        const url = this.formApiUrl(API.GET_SUGGESTIONS);
        const role = this.authService.getRole();
        const request: RoleRequest = { role : role};
        return this.http.post<GetSuggestionsResponse[]>(url, request, { withCredentials: true }).pipe(
            map(response => response),
            catchError(error => HttpErrorHandler.handleHttpError(error))
        );
    }

    private formApiUrl(endpoint: string): string{
        return `${this.apiUri}/${endpoint}`;
    }
}