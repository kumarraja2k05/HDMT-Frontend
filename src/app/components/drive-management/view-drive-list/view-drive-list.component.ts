import { Component, Input,OnInit } from '@angular/core';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import {DataTableDirective} from 'angular-datatables';
import { IncludeService } from 'src/app/services/include.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-drive-list',
  templateUrl: './view-drive-list.component.html',
  styleUrls: ['./view-drive-list.component.css']
})
export class ViewDriveListComponent implements OnInit{
  
  drive_data:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  viewDriveSidebarStatus: boolean=false;

  constructor(private driveService:HringDriveService,private includeService:IncludeService){
    this.driveService.hiring_drives().subscribe((result)=>{
      this.drive_data =result;
      this.dtTrigger.next(null);
      // console.log("******** ",this.driveService.getData,this.Drivedata);
      // console.log("####### ",this.Drivedata);
    });
    // this.drive_data=this.driveService.getData;
    console.log("????????? ",this.drive_data);
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }
  ngOnInit(){
    
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
