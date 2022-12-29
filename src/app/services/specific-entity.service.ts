import { Injectable } from '@angular/core';
import { TokenServiceService } from './token-service.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecificEntityService {
  url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/entity";

  constructor(private tokenService:TokenServiceService,private http:HttpClient) { }
  
  specificEntityRecord:any;
  finalaSpecificEntity:any;

  specificEntity(data:any)
  {
    const finalUrl = this.url + '?' + 'entity_name='+data;
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenService.getToken() 
    })
    return this.http.get(finalUrl,{headers:header});
  }
}



// import { Injectable } from '@angular/core';
// import { TokenServiceService } from './token-service.service';
// import { HttpClient,HttpHeaders } from '@angular/common/http';


// @Injectable({
//   providedIn: 'root'
// })
// export class SpecificDriveService {

//   url = "https://69i2ptm1f4.execute-api.us-east-1.amazonaws.com/dev/drive";

//   constructor(private tokenService:TokenServiceService,private http:HttpClient) { }


//   specificHiringDrive(data:any)
//   {
//     const header = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + this.tokenService.getToken() 
//     })
  
//     const finalUrl = this.url + '?' + 'title='+data;
//     return this.http.get(finalUrl);
//   }
// }
