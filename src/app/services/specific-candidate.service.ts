import { Injectable } from '@angular/core';
import { TokenServiceService } from './token-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecificCandidateService {

  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/candidate";

  constructor(private tokenService:TokenServiceService,private http:HttpClient) { }
  
  specificCandidateRecord:any;
  finalSpecificCandidate:any;

  specificCandidate(data:any)
  {
    const finalUrl = this.url + '?' + 'entity='+data;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.get(finalUrl,{headers:header});
  }
}
