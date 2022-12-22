import { Injectable } from '@angular/core';
import { TokenRefreshService } from './token-refresh.service';
import { Auth } from 'aws-amplify';
@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  public token='raja';
  public refresh_token='kumar';
  constructor() { }

  public includeAuth(){
    console.log(Auth.currentSession().then((result)=>{
      console.log("\n############################################\n");
      console.log(result.getIdToken().getJwtToken());
      console.log("\n********************************************\n");
      console.log(result.getRefreshToken().getToken());
      console.log("\n********************************************\n");
      this.setToken(result.getIdToken().getJwtToken());
      this.setRefreshToken(result.getRefreshToken().getToken());
    }));
  }
  ngOnInit() {
    this.includeAuth();
  }

  getToken(){
    return this.token ;
  }

  setToken(tokenObtained:string){
    this.token=tokenObtained;
    console.log("??????     ",this.token,"///////////// ",this.refresh_token,"............");
  }

  setRefreshToken(token: string){
    this.refresh_token=token;
    console.log("pppppppp     ",this.refresh_token);
  }

  getRefreshToken(){
    console.log("tttttttttttttt     ",this.refresh_token,"  bbbbbbbb  ",this.token,"  mmmmm  ");
    return this.refresh_token;
  }
}