import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @ViewChild('authForm') authForm: NgForm;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) {

  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const { email, password } = this.authForm.value;

    this.isLoading = true;
    this.error = null;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe({
      next: (data) => {
        console.log('data', data);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      error: (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      },
      complete: () => console.info('complete')
    })

    this.authForm.reset();
  }
}
