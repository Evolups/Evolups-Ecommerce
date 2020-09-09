import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = JSON.parse(localStorage.getItem(environment.keyLoginLocalStorage));
        if (currentUser && currentUser.Token) {
            request = request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${currentUser.Token}`,
                    Token: `${currentUser.Token}`
                }
            });
        }

        return next.handle(request);
    }
}
