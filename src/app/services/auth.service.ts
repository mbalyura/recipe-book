import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword'
  apiKey = environment.firabaseApiKey;

  user = new BehaviorSubject<User>(null);

  tokenExpirationTimer;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.signupUrl}/?key=${this.apiKey}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this)),
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.loginUrl}/?key=${this.apiKey}`, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication.bind(this)),
      );
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration));
    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
    const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(response: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
    const user = new User(response.email, response.localId, response.idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(+response.expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage;
    switch (errorResponse?.error?.error?.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid email or password';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'To many attempts. Try again later.';
        break;
      default:
        errorMessage = 'An unknown error occured';
        break;
    }

    return throwError(errorMessage);
  }
}
