import { Component, Input,OnInit } from '@angular/core';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import {DataTableDirective} from 'angular-datatables';
import { IncludeService } from 'src/app/services/include.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-view-drive-list',
  templateUrl: './view-drive-list.component.html',
  styleUrls: ['./view-drive-list.component.css']
})
export class ViewDriveListComponent implements OnInit{
  
  drive_data:any;
  dtOptions:DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  viewDriveSidebarStatus: boolean=false;

  constructor(private driveService:HringDriveService,private includeService:IncludeService){}
  // onSubmitDriveData(data:any)
  // {
  //   this.driveService.saveDriveData(data).subscribe((result)=>{
  //     console.warn(result);
  //     this.Drivedata=result;
  //     // this.dtTrigger.next();
  //   })
  // }
  ngOnInit(){
    this.drive_data=this.driveService.getData;
    console.log("????????? ",this.drive_data);
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
