import { Injectable } from '@angular/core';
import { TokenServiceService } from './token-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SpecificDrivePanelistService {

  constructor(private tokenService:TokenServiceService,private http: HttpClient) { }
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/specific-drive-panelist";

  getspecificDrivePanelists(data:any)
  {
    const finalUrl = this.url + '?' + 'title='+data;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.get(finalUrl,{headers:header});
  }
  
  postSpecificDrivePanelistData(data:any):Observable<any>
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.post(this.url,data,{headers:header});
  }
}
