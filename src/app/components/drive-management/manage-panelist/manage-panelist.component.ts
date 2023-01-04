import { Component,OnInit } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { SpecificDriveService } from 'src/app/services/specific-drive.service';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { Auth } from 'aws-amplify';
import { SpecificDrivePanelistService } from 'src/app/services/specific-drive-panelist.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-panelist',
  templateUrl: './manage-panelist.component.html',
  styleUrls: ['./manage-panelist.component.css']
})
export class ManagePanelistComponent implements OnInit{

  constructor(private specificDrivePanelist: SpecificDrivePanelistService,private includeService:IncludeService,private hiringDriveService:HringDriveService,private tokenService:TokenServiceService,private specificDriveService:SpecificDriveService){
    // console.log(Auth.currentSession().then((result)=>{
    //   this.tokenService.setToken(result.getIdToken().getJwtToken());
    //   this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
    //   this.hiringDriveService.hiring_drives().subscribe((result)=>{
    //     this.hiringDrives=result;
    //   });
    // }));
    this.hiringDriveService.hiring_drives().subscribe((result)=>{
      this.hiringDrives=result;
      this.firstCall = this.hiringDrives[0].sk
      this.specificDriveService.specificHiringDrive(this.firstCall).subscribe((res)=>{
        this.specificDriveData = res;
        console.log("tttttt ",this.specificDriveData);
        this.selectPanelist=true;
        this.firstTitle = this.specificDriveData[0].sk
        this.driveTitle= this.firstTitle
        console.log(Auth.currentSession().then((result)=>{
          this.tokenService.setToken(result.getIdToken().getJwtToken());
          this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
          this.specificDrivePanelist.getspecificDrivePanelists(this.firstTitle).subscribe( (result) =>{
            this.panelistData = result;
            this.dtTrigger.next(null);
          });
        }));  })
    });
  }
  firstTitle:any;
  firstCall:any;
  managePanelistSideBar:boolean= false;
  hiringDrives:any;
  driveTitle:any;
  specificDriveData:any;
  panelistData:any;
  selectPanelist=false;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(){
    this.managePanelistSideBar=true;
    this.includeService.managePanelistSideBarStatus=this.managePanelistSideBar;
  }

  ngOnDestroy(){
    this.managePanelistSideBar=false;
    this.includeService.managePanelistSideBarStatus=this.managePanelistSideBar;
  }

  getSpecificDrive(data:any)
  {
    this.driveTitle=data;
    this.specificDriveService.specificHiringDrive(data).subscribe((res)=>{
    this.specificDriveData = res;
    console.log("tttttt ",this.specificDriveData);
    this.selectPanelist=true;

    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.specificDrivePanelist.getspecificDrivePanelists(this.driveTitle).subscribe( (result) =>{
        this.panelistData = result;
        this.dtTrigger.next(null);
      });
    }));
    
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  })
  }
}
