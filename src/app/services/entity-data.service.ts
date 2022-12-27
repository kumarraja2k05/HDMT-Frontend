import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TokenServiceService } from './token-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EntityDataService {

  constructor(private http: HttpClient,private tokenService:TokenServiceService ) { }
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/entity";
  
  entitylists()
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.get(this.url,{headers:header});
  }
  
  saveEntityData(data:any):Observable<any>
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    console.log(environment.jwtToken);
    return this.http.post(this.url,data,{headers:header});
    
    // return this.http.post(this.url,data,{withCredentials: true});
  }

  updateEntityData(data:any)
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })

    return this.http.put(this.url,data,{headers:header});

  }

  // refreshToken() {
  //   const header = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + this.tokenService.getrefreshToken() 
  //   })
  //   return this.http.post(this.url + 'refreshtoken', {}, {headers:header});
  // }
}
