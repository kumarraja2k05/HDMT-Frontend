import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs/internal/Observable';
import { TokenServiceService } from './token-service.service';
import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
const httpOptions = {
  
};

@Injectable({
  providedIn: 'root'
})

export class PanelistDataService {
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/panelist";
  fullName:any;
  constructor(private http: HttpClient,private tokenService:TokenServiceService) { }

  panelists()
  {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.get(this.url,{headers:header});
  }
  
  savePanelistData(data:any):Observable<any>
  {
    var attributeList = [];
    
    this.fullName = data.name
    let panelist:any = {
      "name":this.fullName,
      "email" : data.email,
      "phone_number" : data.phone_number,
      "custom:role" : data['custom:role'],
    }
    for (let key  in panelist) {
      let attrData = {
        Name: key,
        Value: panelist[key]
      }
      let attribute = new CognitoUserAttribute(attrData);
      attributeList.push(attribute)
    }
    
    var body = {
      "email" : data.email,
      "attr":attributeList
    }
  
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.post(this.url,body,{headers:header});
  }


  editPanelistData(data:any)
  {
    var attributeList = [];
    let panelist:any = {
      "name" : data.name,
      "email" : data.email,
      "phone_number" : data.phone_number,
      "custom:role" : data.role
    }
    for (let key  in panelist) {
      let attrData = {
        Name: key,
        Value: panelist[key]
      }
      let attribute = new CognitoUserAttribute(attrData);
      attributeList.push(attribute)
    }
    var body = {
      "email" : data.email,
      "attr":attributeList
    }
    
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.put(this.url,body,{headers:header});
    // return this.http.get('google.com')
  }
}
