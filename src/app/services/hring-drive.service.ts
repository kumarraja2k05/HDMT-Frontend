import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HringDriveService {
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/drive";
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  hiring_drives()
  {
    return this.http.get(this.url)
    .pipe(
      catchError(this.handleError)
    );
  }
  
  saveDriveData(data:any)
  {
    return this.http.post(this.url,data).pipe(
      catchError(this.handleError)
    );
  }
}