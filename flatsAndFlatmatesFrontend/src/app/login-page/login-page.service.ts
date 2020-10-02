import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginPageService {

  private loginUrl: '/app/login/';

  constructor(private http: HttpClient) { }

  loginAttempt(model): Observable<any>{
    let criteria = {
      criteria: model
    }
    return this.http.post<any>(this.loginUrl, criteria)
      .pipe(
        catchError(this.handleError<any>('getHeroes', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
