import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn()
  {

    var userLogged = false
    let poolData = {
      UserPoolId: environment.cognito['userPoolId'],
      ClientId: environment.cognito['userPoolWebClientId']
    };
    
    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    var userRole='';
    console.log(cognitoUser)
    let role:any[] = []
    if(cognitoUser!=null)
    {
        cognitoUser.getSession((err: any, session: any) => {
        if (err) {
            alert(err.message || JSON.stringify(err));
        }
        userRole = cognitoUser?.getSignInUserSession()?.getIdToken().payload['custom:role']
        console.log(userRole)
      })
      userLogged=true
      environment.role = userRole
      role.push(userLogged)
      role.push(userRole)
    }
    return role
  }
}
