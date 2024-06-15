import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../auth/auth-service';
import { environment } from '../../../environments/environment';

import * as API from '../../utils/protocols/api.protocols';

@Injectable({
    providedIn: 'root'
})
export class RefreshService {
    private interval: any;
    private apiUrl: string = `${environment.API_DIR}:${environment.API_PORT}`;

    constructor (
        private http: HttpClient,
        private authService: AuthService
    ) {}

    /**
   * Starts refresh timer with interval -10 minutes of token expiration time
   * @param expiresInStorage Token expiration time 
   */
    start(expiresIn: string) {
        this.stop();
        let timer = parseInt(expiresIn);
        this.interval = setInterval(() => this.refreshToken(), (timer * 1000) - (59 * 60 * 1000));
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    refreshToken() {
        const url = this.formApiUrl(API.REFRESH)
        this.http.get(url, { withCredentials: true }).subscribe({
            next: () => {
                this.start(this.authService.getExpiresIn());
            },
            error: () => {
                this.authService.clearEscomioLocalStorage();
            }
        });
    }

    private formApiUrl(endpoint: string): string {
        return `${this.apiUrl}/${endpoint}`;
    }
}

