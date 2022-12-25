import { Component } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';

declare var window: any;

@Component({
  selector: 'app-show-admin-form',
  templateUrl: './show-admin-form.component.html',
  styleUrls: ['./show-admin-form.component.css']
})
export class ShowAdminFormComponent {
  adminFormModal:any;
  panelistData:any;
  constructor(private panelistDataService:PanelistDataService,private tokenService: TokenServiceService){
    
  }
  ngOnInit(): void {
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.panelistDataService.panelists().subscribe((panelists)=>{
        this.panelistData =panelists;
      })
    }));
    this.adminFormModal = new window.bootstrap.Modal(
      document.getElementById('adminModal')
    );
  }

  openAdminFormModal(){
    this.adminFormModal.show();
  }

  saveAdmin(){
    this.adminFormModal.hide();
  }

  getAdminData(data:any){
    // console.warn(data);
    // this.entityService.saveEntityData(data).subscribe((EntityData)=>{
    //   console.warn(EntityData);
    //   // this.dtTrigger.next();
    // })
    // this.router.navigate(['/entity-form']);

  }
}
