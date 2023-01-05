import { Injectable } from '@angular/core';
import { TokenServiceService } from './token-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SpecificPanelCandidateService {

  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/panel-candidate";

  constructor(private tokenService:TokenServiceService,private http:HttpClient) { }

  getSpecificPanelCandidate(data:any)
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
  
    const finalUrl = this.url + '?' + 'candidate_email='+data;
    return this.http.get(finalUrl,{headers:header});
  }

  postSpecificPanelCandidate(data:any):Observable<any>
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.post(this.url,data,{headers:header});
    
    // return this.http.post(this.url,data,{withCredentials: true});
  }
}

