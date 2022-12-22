import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpHeaders,HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenServiceService } from './token-service.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { PanelistDataService } from './panelist-data.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService implements HttpInterceptor{

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public static accessToken="";


  constructor(private tokenService:TokenServiceService,private panelistService:PanelistDataService,private http: HttpClient,private router: Router) { }

  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev";

  refresh_token() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getRefreshToken() 
    })
    console.log("eeeeeeeeeeeee ",TokenRefreshService.accessToken);
    return this.http.post(this.url + 'refreshtoken', {}, {headers:header});
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // const req=request.clone({
    //   setHeaders:{
    //     Authorization: 'Bearer ${TokenRefreshService.accessToken}'
    //   }
    // });
    // return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
    //   if(err.status === 401){
    //     return this.http.post('https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/refresh', {}, {withCredentials: true}).pipe(
    //       switchMap((res:any) => {
    //         TokenRefreshService.accessToken=res.token;
    //         return next.handle(request.clone({
    //           setHeaders:{
    //             Authorization: 'Bearer ${TokenRefreshService.accessToken}'
    //           }
    //         }));
    //       })
    //     )
    //   }
    //   return throwError(() => err);
    // }));
  

  return next.handle(request).pipe( tap(() => {},
      (err: any) =>{
      if (err instanceof HttpErrorResponse) {
        this.refresh_token().pipe(
          switchMap((res:any) => {
            TokenRefreshService.accessToken=res.token;
            return next.handle(request.clone({
              setHeaders:{
                Authorization: 'Bearer ${TokenRefreshService.accessToken}'
              }
            }));
          })
        )
        console.log("//////////////////////");
        
      }
    }));

}

}