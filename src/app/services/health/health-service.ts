//#region Imports
// Packages
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Utils
import * as API from '../../utils/protocols/api.protocols';
import { HttpErrorHandler } from '../../utils/handlers/http-error-handler';
import { ApiMessageResponse } from '../../models/api/api-message-response';

import { environment } from '../../../environments/environment';
//#endregion

/**
 * Health Service
 * Provides funcionalitites to interact with the API Health Endpoints
 */
@Injectable({
    providedIn: 'root'
})
export class HealthService {

    // Base api URL
    private apiUrl: string = environment.API_DIR + ":" + environment.API_PORT;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * GET - Request current service version
     * @returns API service version
     */
    public getServiceVersion(): Observable<any> {
        return this.http.get<ApiMessageResponse>(this.apiUrl + "/" + API.GET_SERVICE_VERSION).pipe(
            catchError(error => HttpErrorHandler.handleHttpError(error))
        );
    }
}
