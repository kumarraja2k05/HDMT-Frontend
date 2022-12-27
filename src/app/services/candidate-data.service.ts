import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateDataService {

  url="https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/candidate";
  constructor(private http: HttpClient,private tokenService:TokenServiceService) { }

  candidate_list()
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.get(this.url,{headers:header});
  }
  
  saveCandidateData(data:any):Observable<any>
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    // console.log(environment.jwtToken);
    return this.http.post(this.url,data,{headers:header});
  }
}
