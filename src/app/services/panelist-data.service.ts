import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PanelistDataService {
  url = "https://6l13soe74b.execute-api.us-east-1.amazonaws.com/dev";
  constructor(private http: HttpClient) { }

  panelists()
  {
    return this.http.get(this.url);
  }
  
  savePanelistData(data:any)
  {
    return this.http.post(this.url,data);
  }

}
