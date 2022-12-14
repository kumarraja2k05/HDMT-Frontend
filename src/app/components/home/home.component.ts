import { Component,Input,Output } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { IncludeService } from 'src/app/services/include.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router : Router,private cognitoService: CognitoService,private includeService:IncludeService){}

  sideNavStatus:boolean=false;

  ngOnInit(){
    this.sideNavStatus=true;
    this.includeService.homeSidebarStatus=this.sideNavStatus;
    // this.includeService.HomeSideBar(this.sideNavStatus);
    this.getUserDetails();
  }

  public func(){
    console.log(this.sideNavStatus);
  }

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
