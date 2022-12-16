import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntityDataService {

  constructor(private http: HttpClient) { }
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/entity";
  
  entitylists()
  {
    return this.http.get(this.url);
  }
  
  saveEntityData(data:any)
  {
    return this.http.post(this.url,data);
  }
}
