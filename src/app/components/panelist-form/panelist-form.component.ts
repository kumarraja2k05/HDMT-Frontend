import { Component,OnInit } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { IncludeService } from 'src/app/services/include.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { Auth } from 'aws-amplify';
import { FormGroup, NgForm } from '@angular/forms';
import { Panelist } from 'src/app/models/panelist';

declare var window: any;

@Component({
  selector: 'app-panelist-form',
  templateUrl: './panelist-form.component.html',
  styleUrls: ['./panelist-form.component.css']
})
export class PanelistFormComponent implements OnInit {
  panelistformModal: any;  
  panelistData:any;
  PanlistsideNavStatus:boolean=false;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  newPanelist:Panelist = new Panelist();

  constructor(private router:Router,private panelistService:PanelistDataService,private tokenService:TokenServiceService,private includeService:IncludeService){}

  ngOnInit(){
    console.log(Auth.currentSession().then((result)=>{
      // environment.jwtToken=result.getIdToken().getJwtToken();
      // console.log(environment.jwtToken);
      console.log("\n############################################\n");
      console.log(result.getIdToken().getJwtToken());
      console.log("\n********************************************\n");
      console.log(result.getRefreshToken().getToken());
      console.log("\n********************************************\n");
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.get_data();
    }));
    // console.log("aaaaaaa ",this.tokenService.getRefreshToken());
    // console.log("bbbbbbb ",this.tokenService.getToken());
    
  }

  public get_data(){
    this.panelistService.panelists().subscribe((result) =>{
      this.panelistData = result;
      this.dtTrigger.next(null);
    });
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }

  ngDoCheck(): void {
    this.panelistformModal = new window.bootstrap.Modal(
      document.getElementById('panelistModal')
    );
    this.PanlistsideNavStatus=true;
    this.includeService.panelistSidebarStatus=this.PanlistsideNavStatus;
  }
  
  ngOnDestroy(){
    this.PanlistsideNavStatus=false;
    this.includeService.panelistSidebarStatus=this.PanlistsideNavStatus;
    this.dtTrigger.unsubscribe();
  }
  openPanelistFormModal() {
    this.panelistformModal.show();
  }

  savePanelist() {
    this.panelistformModal.hide();
  }

  postPanelistData(data:NgForm)
  {
    console.warn(data);
    const body={
      "firstName":this.newPanelist.firstName,
      "password": "Defaultpass@123",
      "lastName":this.newPanelist.lastName,
      "email":this.newPanelist.email,
      "phone_number":this.newPanelist.phone_number,
      "custom:role":this.newPanelist['custom:role']
    }
    console.log(body);
    console.log(body['email'])
    this.panelistService.savePanelistData(body).subscribe((result)=>{
      console.warn(result);
      this.tokenService.setRefreshToken(result.token);
      this.tokenService.setToken(result.token);
    })
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([currentRoute]);  

    });
  }
}
