import { Component, Input,OnInit } from '@angular/core';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import {DataTableDirective} from 'angular-datatables';
import { IncludeService } from 'src/app/services/include.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';

@Component({
  selector: 'app-view-drive-list',
  templateUrl: './view-drive-list.component.html',
  styleUrls: ['./view-drive-list.component.css']
})
export class ViewDriveListComponent implements OnInit{
  iterate:any;
  drive_data:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  viewDriveSidebarStatus: boolean=false;

  constructor(private driveService:HringDriveService,private includeService:IncludeService,private tokenService:TokenServiceService){}
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
      this.driveService.hiring_drives().subscribe((result) =>{
        this.drive_data = result;
        this.dtTrigger.next(null);
      });
    }));
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }

  ngDoCheck(){
    this.viewDriveSidebarStatus=true;
    this.includeService.viewDriveList=this.viewDriveSidebarStatus;

  }

  ngOnDestroy(){
    this.viewDriveSidebarStatus=false;
    this.includeService.viewDriveList=this.viewDriveSidebarStatus;
    this.dtTrigger.unsubscribe();
  }
}
