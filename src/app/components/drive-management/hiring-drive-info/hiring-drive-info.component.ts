import { Component } from '@angular/core';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { IncludeService } from 'src/app/services/include.service';
import { SpecificDriveService } from 'src/app/services/specific-drive.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { SpecificEntityService } from 'src/app/services/specific-entity.service';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';

@Component({
  selector: 'app-hiring-drive-info',
  templateUrl: './hiring-drive-info.component.html',
  styleUrls: ['./hiring-drive-info.component.css']
})
export class HiringDriveInfoComponent {
  hiringDriveSideBar:boolean= false;
  hiringDrives:any;
  specificDrive:any;
  specificEntityData:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  firstCall:any;

  constructor(private includeService:IncludeService,private tokenService:TokenServiceService ,private hiringDriveService:HringDriveService,private specificDriveService:SpecificDriveService,private specificEntityService: SpecificEntityService){
    console.log('this is constructor')
    this.hiringDriveService.hiring_drives().subscribe((result)=>{
      this.hiringDrives=result;
      console.log(this.hiringDrives)
      this.firstCall = this.hiringDrives[0].sk
      this.specificDriveService.specificHiringDrive(this.firstCall).subscribe((record)=>{
        this.specificDrive = record;
        this.specificEntityService.specificEntityRecord=this.specificDrive[0].entity;;
        this.specificEntityData=this.specificEntityService.finalaSpecificEntity;
        console.log(Auth.currentSession().then((result)=>{
        this.tokenService.setToken(result.getIdToken().getJwtToken());
        this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
        // this.getSpecificEntity();
        this.getSpecificEntity(this.specificDrive[0].entity);
      }));
      }) 
    })
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
      this.specificEntityService.specificEntityRecord=this.specificDrive[0].entity;;
      this.specificEntityData=this.specificEntityService.finalaSpecificEntity;
      console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      // this.getSpecificEntity();
      this.getSpecificEntity(this.specificDrive[0].entity);
    }));
    }) 
  }
 
  getSpecificEntity(data:any){
    console.log("***********************************");
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.specificEntityService.specificEntity(data).subscribe((res)=>{
        this.specificEntityData = res;
      })
    }));
    
    console.log("///////////////////////////")
  }
}
