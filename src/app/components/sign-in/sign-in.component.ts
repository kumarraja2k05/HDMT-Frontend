import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CognitoService } from 'src/app/services/cognito.service';
import { CanActivate } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user : User | undefined;
  alertMessage : string=' ';
  showAlert: boolean=false;

  constructor(private router: Router,private cognitoService: CognitoService){}

  ngOnInit(): void{
    this.user = {} as User;
  }

  signInWithCognito(){
    if(this.user && this.user.email && this.user.password)
    {
      this.cognitoService.signIn(this.user)
      .then(() => {
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
