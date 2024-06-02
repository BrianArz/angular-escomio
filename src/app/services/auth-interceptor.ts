
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
    ) { }

    /**
     * Adds auth cookie to every request
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Clone the request to add the new header.
        let headers = new HttpHeaders();


        // add previously added headers
        const keys = req.headers.keys();
        if (keys.length > 0) {
            keys.forEach(x => {
                headers = headers.append(x, req.headers.get(x) ?? '');
            })
        }

        const authReq = req.clone({ headers: headers, withCredentials: true });

        /** 
         * If response is unauthorized, redirect to login
         */
        return next.handle(authReq).pipe( tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
           return;
          }
        }
      }));
    }
}