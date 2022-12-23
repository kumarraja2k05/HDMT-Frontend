import { Component,OnInit } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { IncludeService } from 'src/app/services/include.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenRefreshService } from 'src/app/services/token-refresh.service';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { Auth } from 'aws-amplify';
import { FormGroup } from '@angular/forms';

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

  constructor(private panelistService:PanelistDataService,private refreshToken:TokenRefreshService,private tokenService:TokenServiceService,private includeService:IncludeService){}

  ngOnInit(){
    this.get_data();
  }

  public get_data(){
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
      this.panelistService.panelists().subscribe((result) =>{
        this.panelistData = result;
        this.dtTrigger.next(null);
      });
    }));
    // console.log("aaaaaaa ",this.tokenService.getRefreshToken());
    // console.log("bbbbbbb ",this.tokenService.getToken());

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

  getPanelistData(data:any)
  {
    console.warn(data);
    this.panelistService.savePanelistData(data).subscribe((result)=>{
      console.warn(result);
      TokenRefreshService.accessToken=result.token;
      this.tokenService.setRefreshToken(result.token);
      this.tokenService.setToken(result.token);
    })
    // this.get_data();
  }

  // refresh_page(){
  //   var timeToWaitBeforeRefreshTriggers = 600; // Set this to the amount of time it takes for the action link to complete (milliseconds)
  //   var tableOneId = 'refresh-table'; // Change this to the first table ID

  //   var setOnClick = function() {
  //       $('.x-type-data-table').find('.action-link-refresh a').click(function() {
  //           setTimeout(function() {
  //               $('[ng-click="refreshData()"]').click();
  //           }, timeToWaitBeforeRefreshTriggers);
  //       });
  //   };
  //   TB.render(tableOneId, function() {
  //       setOnClick();
  //   });
    
  //   $('body').click(function() { // Reset after any action that can wipe the onclick event occurs by using body onclick
  //       setTimeout(function() {
  //           $('tbody tr').find('.action-link-refresh a').off();
  //           setOnClick();
  //       }, 800);
  //   });}

}
