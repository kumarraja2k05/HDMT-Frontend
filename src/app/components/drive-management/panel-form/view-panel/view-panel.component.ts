import { Component,OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { PanelDataService } from 'src/app/services/panel-data.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { IncludeService } from 'src/app/services/include.service';

@Component({
  selector: 'app-view-panel',
  templateUrl: './view-panel.component.html',
  styleUrls: ['./view-panel.component.css']
})
export class ViewPanelComponent implements OnInit {

  panelData:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  viewPanelSideBarStatus:boolean=false;


  constructor(private panelService: PanelDataService,private tokenService:TokenServiceService,private includeService:IncludeService){}

  ngOnInit(){
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.panelService.getPanel().subscribe((res)=>{
        this.panelData=res;
        this.dtTrigger.next(null);
      })
    }));

    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }
  
  ngDoCheck(): void {
    this.viewPanelSideBarStatus=true;
    this.includeService.viewPanelList=this.viewPanelSideBarStatus;
  }

  ngOnDestroy(){
    this.viewPanelSideBarStatus=false;
    this.includeService.viewPanelList=this.viewPanelSideBarStatus;
  }
}
