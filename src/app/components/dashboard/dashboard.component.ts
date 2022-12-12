import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/services/cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(private router : Router,private cognitoService: CognitoService){}

  ngOnInit(){
    this.getUserDetails();
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

  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
