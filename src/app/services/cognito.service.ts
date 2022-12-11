import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify';
import {Auth} from 'aws-amplify';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() { 
    Amplify.configure({
      Auth:environment.cognito
    })
  }


  public getUser(): Promise<any>{
    return Auth.currentUserInfo();
  }

  public signIn(user:User): Promise<any>
  {
    return Auth.signIn(user.email,user.password);
  }

  public signOut(): Promise<any>
  {
    return Auth.signOut();
  }



}
