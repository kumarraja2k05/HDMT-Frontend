import { Injectable } from '@angular/core';
import { TokenServiceService } from './token-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecifcPanelService {

  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/panel";

  constructor(private tokenService:TokenServiceService,private http:HttpClient) { }

  specificPanel(data:any)
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
  
    const finalUrl = this.url + '?' + 'title='+data;
    return this.http.get(finalUrl,{headers:header});
  }
}


