import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { TokenServiceService } from './token-service.service';
@Injectable({
  providedIn: 'root'
})
export class PanelistDataService {
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/panelist";
  token = this.tokenService.getToken();
  public readonly header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });
  public readonly requestOptions={headers: this.header};
  constructor(private http: HttpClient,private tokenService:TokenServiceService) { }

  panelists()
  {
    return this.http.get(this.url,this.requestOptions);
  }
  
  savePanelistData(data:any)
  {
    return this.http.post(this.url,data);
  }

}
