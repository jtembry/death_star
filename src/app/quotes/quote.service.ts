import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IQuote } from './quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quoteUrl = 'https://api.myjson.com/bins/mttfw';

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<IQuote[]> {
    return this.http.get<IQuote[]>(this.quoteUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getQuote(id: number): Observable<IQuote | undefined> {
    return this.getQuotes().pipe(
      map((quotes: IQuote[]) => quotes.find(p => p.quoteId === id))
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
