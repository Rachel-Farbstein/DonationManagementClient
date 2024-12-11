import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log(`Request URL: ${req.url}`);

        if (req.url.startsWith(environment.apiBaseUrl)) {
            const token = localStorage.getItem('jwt');

            if (token) {
                const cloned = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("head:", cloned.headers);
                return next.handle(cloned);
            }

        }
        return next.handle(req);
    }
}
