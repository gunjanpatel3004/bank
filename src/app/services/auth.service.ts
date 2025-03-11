import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  private apiUrl =
    'https://starfish-app-g96va.ondigitalocean.app/v1/accounts/auth';
  private authSubject = new BehaviorSubject<boolean>(false);
  auth$ = this.authSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, errorSubject: Subject<string>) {
    this.http
      .post<{ token?: string; error?: string }>(this.apiUrl, {
        email,
        password,
      })
      .subscribe(
        (response) => {
          if (response.token) {
            // Successful login
            localStorage.setItem('token', response.token);
            this.authSubject.next(true);
            this.router.navigate(['/dashboard']);
          } else if (response.error) {
            // Pass error message to the component
            errorSubject.next(response.error);
          }
        },
        (error) => {
          errorSubject.next('Login failed. Please try again later.');
        }
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }
  createAccount(accountData: any): Observable<any> {
    const url =
      'https://starfish-app-g96va.ondigitalocean.app/v1/accounts/create';
    return this.http.post(url, accountData);
  }

  activateAccount(email: string, activationCode: string): Observable<any> {
    const url =
      'https://starfish-app-g96va.ondigitalocean.app/v1/accounts/activate';
    return this.http.post(url, { email, activationCode });
  }
  logout() {
    localStorage.removeItem('token');
    this.authSubject.next(false);
    this.router.navigate(['/']);
  }
  isAuthenticated() {
    return !!this.getToken();
  }
}
