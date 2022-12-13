import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router : Router,private cognitoService: CognitoService){}
  ngOnInit(){
    this.getUserDetails();
  }

  sideNavStatus:boolean=false;

  private getUserDetails(){
    this.cognitoService.getUser()
    .then((user:any) =>{
      if(user)
      {
        console.log(user);
      }
      else{
        this.router.navigate(['/sign-in']);
      }
    })
  }

  signOutWithCognito()
  {
    this.cognitoService.signOut()
    .then(()=>{
      this.router.navigate(['/sign-in']);
    })
  }
}
