import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.user.pipe(
      take(1),  //takes user 1 time and unsubscribe
      exhaustMap((user: User) => {  // change returning subs
        if (!user) {
          return next.handle(request);
        }

        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(modifiedRequest);
      })
    );
  }
}
