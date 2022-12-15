import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.componet.css']
})
export class HeaderComponent {

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean=false;
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

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }
}
