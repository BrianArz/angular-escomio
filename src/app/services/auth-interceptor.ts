import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth/auth-service';
import { Router } from '@angular/router';

import * as ROUTES from '../utils/protocols/common.protocols';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Clone the request to add the new header.
    let headers = new HttpHeaders();

    // Add previously added headers
    const keys = req.headers.keys();
    if (keys.length > 0) {
        keys.forEach(x => {
            headers = headers.append(x, req.headers.get(x) ?? '');
        });
    }

    const authReq = req.clone({ headers: headers, withCredentials: true });

    /** 
     * If response is unauthorized, redirect to login
     */
    return next(authReq).pipe(
        tap(() => { },
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 401) {
                        return;
                    }
                    authService.clearEscomioLocalStorage();
                    router.navigate([ROUTES.LOGIN]);
                }
            })
    );
};
