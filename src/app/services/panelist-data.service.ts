import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';
import { TokenServiceService } from './token-service.service';

const httpOptions = {
  
};

@Injectable({
  providedIn: 'root'
})

export class PanelistDataService {
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/panelist";
  constructor(private http: HttpClient,private tokenService:TokenServiceService) { }

  panelists()
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.get(this.url,{headers:header});
  }
  
  savePanelistData(data:any):Observable<any>
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    // console.log(environment.jwtToken);
    return this.http.post(this.url,data,{headers:header});
  }

  // refreshToken(token: string) {
  //   const header = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.tokenService.getrefreshToken() 
  //   })
  //   return this.http.post(this.url + 'refreshtoken', {
  //     refreshToken: token
  //   }, {headers:header});
  // }
}
