import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';
import { CanActivate } from '@angular/router';
import { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment.prod';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { IncludeService } from 'src/app/services/include.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user : User | undefined;
  alertMessage : string=' ';
  showAlert: boolean=false;

  constructor(private router: Router,private cognitoService: CognitoService,private includeService: IncludeService,private tokenService:TokenServiceService){}

  ngOnInit(): void{
    this.user = {} as User;
  }
  token='';
  signInWithCognito(){
    if(this.user && this.user.email && this.user.password)
    {
      this.cognitoService.signIn(this.user)
      .then((user:any) => {
        this.tokenService.includeAuth();
        localStorage.setItem('username',user['username'])
        // console.log(Auth.currentSession().then((result)=>{
        //   // environment.jwtToken=result.getIdToken().getJwtToken();
        //   // console.log(environment.jwtToken);
        //   console.log("\n############################################\n");
        //   console.log(result.getIdToken().getJwtToken());
        //   console.log("\n********************************************\n");
        //   console.log(result.getRefreshToken().getToken());
        //   console.log("\n********************************************\n");
        //   this.tokenService.setToken(result.getIdToken().getJwtToken());
        //   this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
        // }));    
        this.router.navigate(['/home']);
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
