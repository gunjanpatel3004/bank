import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';

interface AccountResponse {
  accounts: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl =
    'https://starfish-app-g96va.ondigitalocean.app/v1/accounts/info'; // Original API URL for account info
  private balanceApiUrl =
    'https://starfish-app-g96va.ondigitalocean.app/v1/accounts/balance'; // New API URL for balance
  private transferApiUrl =
    'https://starfish-app-g96va.ondigitalocean.app/v1/transactions/transfer';
  private depositApiUrl =
    'https://starfish-app-g96va.ondigitalocean.app/v1/transactions/deposit';
  private withdrawApiUrl =
    'https://starfish-app-g96va.ondigitalocean.app/v1/transactions/withdraw';
  private transactionHistoryApiUrl =
    'https://starfish-app-g96va.ondigitalocean.app/v1/transactions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeader() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'x-access-token': token || '',
      }),
    };
  }

  getAccounts() {
    return this.http.get<AccountResponse>(this.apiUrl, this.getHeader()).pipe(
      catchError((error) => {
        console.error('Error fetching account info:', error);
        return throwError(error);
      })
    );
  }

  getAccountByEmail(email: string) {
    const url = `${this.apiUrl}/${email}`;
    return this.http.get<any>(url, this.getHeader()).pipe(
      catchError((error) => {
        console.error('Error fetching account by email:', error);
        return throwError(error);
      })
    );
  }

  // Get account balance
  getBalance(): Observable<any> {
    return this.http.get<any>(this.balanceApiUrl, this.getHeader()).pipe(
      catchError((error) => {
        console.error('Error fetching balance:', error);
        return throwError(error);
      })
    );
  }

  transferFunds(transferData: any): Observable<any> {
    return this.http
      .post<any>(this.transferApiUrl, transferData, this.getHeader())
      .pipe(
        catchError((error) => {
          console.error('Error transferring funds:', error);
          return throwError(error);
        })
      );
  }
  depositFunds(depositData: any): Observable<any> {
    return this.http
      .post<any>(this.depositApiUrl, depositData, this.getHeader())
      .pipe(
        catchError((error) => {
          console.error('Error depositing funds:', error);
          return throwError(error);
        })
      );
  }

  withdrawFunds(withdrawData: any): Observable<any> {
    return this.http
      .post<any>(this.withdrawApiUrl, withdrawData, this.getHeader())
      .pipe(
        catchError((error) => {
          console.error('Error withdrawing funds:', error);
          return throwError(error);
        })
      );
  }
  
  getTransactionHistory(days: number): Observable<any> {
    const url = `${this.transactionHistoryApiUrl}/${days}/statement`;
    return this.http.get<any>(url, this.getHeader()).pipe(
      catchError((error) => {
        console.error('Error fetching transaction history:', error);
        return throwError(error);
      })
    );
  }
}