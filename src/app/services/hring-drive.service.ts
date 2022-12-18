import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HringDriveService {
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/drive";
  constructor(private http: HttpClient) { }

  hiring_drives()
  {
    return this.http.get(this.url);
  }
  
  saveDriveData(data:any)
  {
    return this.http.post(this.url,data);
  }
}
