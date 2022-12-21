import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  public token='';
  constructor() { }

  getToken(){
    return this.token ;
  }

  setToken(tokenObtained:string){
    this.token=tokenObtained;
    console.log(this.token);
  }
}
