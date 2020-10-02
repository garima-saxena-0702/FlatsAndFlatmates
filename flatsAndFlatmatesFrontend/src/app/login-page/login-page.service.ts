import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginModel } from './login.model';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  private isAuthenticated = false;
  private token: string;
  private authStatusListner = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;

  constructor(private http: HttpClient, private router: Router) { }

  loginAttempt(email: string, password: string) {
    const authData: LoginModel = { email: email, password: password };
    this.http.put<{ token: string, expiresIn: string, userId: string }>(BACKEND_URL + "/login", authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.userId = response.userId
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(parseInt(expiresInDuration));
          this.isAuthenticated = true;
          this.authStatusListner.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + parseInt(expiresInDuration) * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListner.next(false);
      })
  }

  logoutClicked() {
    this.token = null;
    this.userId = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    clearTimeout(this.tokenTimer);
    this.cleardata();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log(duration)
    this.tokenTimer = setTimeout(() => {
      this.logoutClicked();
    }, duration * 1000)
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private cleardata() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
}
