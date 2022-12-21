import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';
import { CanActivate } from '@angular/router';
import { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment.prod';
import { TokenServiceService } from 'src/app/services/token-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user : User | undefined;
  alertMessage : string=' ';
  showAlert: boolean=false;

  constructor(private router: Router,private cognitoService: CognitoService,private tokenService:TokenServiceService){}

  ngOnInit(): void{
    this.user = {} as User;
  }
  token='';
  signInWithCognito(){
    if(this.user && this.user.email && this.user.password)
    {
      this.cognitoService.signIn(this.user)
      .then(() => {
        this.router.navigate(['/home']);
        console.log(Auth.currentSession().then((result)=>{
          // environment.jwtToken=result.getIdToken().getJwtToken();
          // console.log(environment.jwtToken);
          console.log(result.getIdToken().getJwtToken());
          this.tokenService.setToken(result.getIdToken().getJwtToken());
        }));
      })
      .catch((error:any) => {
        this.displayAlert(error.message);
      })
    }
    else{
      this.displayAlert("Please enter a valid email or password");
    }
  }

  private displayAlert(message:string)
  {
    this.alertMessage=message;
    this.showAlert=true;
  }
}
