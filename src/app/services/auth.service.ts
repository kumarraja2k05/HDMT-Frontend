import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn():boolean
  {
    var userLogged = false
    let poolData = {
      UserPoolId: environment.cognito['userPoolId'],
      ClientId: environment.cognito['userPoolWebClientId']
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if(cognitoUser!=null)
    {
      userLogged=true
    }
    return userLogged
  }
}
