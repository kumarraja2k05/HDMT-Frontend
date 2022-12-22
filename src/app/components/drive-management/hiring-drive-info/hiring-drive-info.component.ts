import { Component } from '@angular/core';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { IncludeService } from 'src/app/services/include.service';
import { SpecificDriveService } from 'src/app/services/specific-drive.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-hiring-drive-info',
  templateUrl: './hiring-drive-info.component.html',
  styleUrls: ['./hiring-drive-info.component.css']
})
export class HiringDriveInfoComponent {
  hiringDriveSideBar:boolean= false;
  hiringDrives:any;
  specificDrive:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private includeService:IncludeService,private hiringDriveService:HringDriveService,private specificDriveService:SpecificDriveService){
    this.hiringDriveService.hiring_drives().subscribe((result)=>{
      this.hiringDrives=result;
      this.dtTrigger.next(null);
    })
    this.dtOptions={
      
    };
    
  }

  ngOnInit(): void {
    this.hiringDriveSideBar=true;
    this.includeService.singlrDriveInfo=this.hiringDriveSideBar;
    // console.log("drive management:-------------  ",this.driveManagementSideBar);
  }
  ngOnDestroy(){
    this.hiringDriveSideBar=false;
    this.includeService.singlrDriveInfo=this.hiringDriveSideBar;
    // console.log("drive destory ###########  ",this.driveManagementSideBar);
  }



  getSpecificDrive(data:any)
  {
    this.specificDriveService.specificHiringDrive(data).subscribe((record)=>{
      this.specificDrive = record;
    })
  }
 
}
