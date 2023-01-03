import { Component } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { Router } from '@angular/router';
import { PanelDataService } from 'src/app/services/panel-data.service';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { SpecificDriveService } from 'src/app/services/specific-drive.service';
import { SpecificCandidateService } from 'src/app/services/specific-candidate.service';
import { SpecificDrivePanelistService } from 'src/app/services/specific-drive-panelist.service';
declare var window: any;

@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.css']
})
export class PanelFormComponent {
  panelformModal: any;
  panelData:any;
  hiringDrives:any;
  drive_data:any;
  PanelSideNavStatus:boolean=false;
  specificDrive:any;
  specificCandidateData:any;
  selectedCandidate:any=[];
  specificDrivePanelist:any;
  driveTitle: any;
  selectedCoordinator:any;
  selectedPanelist:any;
  Paneldata:any;
  formSelected:boolean=true;

  constructor(private specificCandidateService: SpecificCandidateService,private router:Router,private includeService:IncludeService,private hiringDriveService:HringDriveService,private specificDriveService:SpecificDriveService,private panelService:PanelDataService,private specificDrivePanelistService: SpecificDrivePanelistService,private tokenService:TokenServiceService) {
    this.hiringDriveService.hiring_drives().subscribe((result)=>{
      this.hiringDrives=result;
    })
  }

  ngDoCheck(): void {
    this.PanelSideNavStatus=true;
    this.includeService.panelSideBarStatus=this.PanelSideNavStatus;
    console.log("************ ",this.PanelSideNavStatus,this.includeService.panelistSidebarStatus);
  }
  
  ngOnDestroy(){
    this.PanelSideNavStatus=false;
    this.includeService.panelSideBarStatus=this.PanelSideNavStatus;
    console.log("/////////////// ",this.PanelSideNavStatus," ",this.includeService.panelistSidebarStatus);
  }
 
  ngOnInit(): void {
    
  }
  
  getSpecificDrive(data:any)
  {
    this.driveTitle=data;
    this.specificDriveService.specificHiringDrive(data).subscribe((record)=>{
      this.specificDrive = record;
      console.log("yyyy ",data,this.specificDrive);
      // this.specificCandidateService.specificCandidateRecord=this.specificDrive[0].entity;
      // this.specificCandidateData=this.specificCandidateService.finalSpecificCandidate;
      this.getSpecificCandidate(this.specificDrive[0].entity);
      this.getSpecificDrivePanelist(data);
      // console.log(Auth.currentSession().then((result)=>{
      // this.tokenService.setToken(result.getIdToken().getJwtToken());
      // this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      
      
      // })); 
    }) 
    
  }

  getSpecificDrivePanelist(data:any){

    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.specificDrivePanelistService.getspecificDrivePanelists(data).subscribe((res)=>{
        this.specificDrivePanelist=res;
        console.log("kkkkkkk ",this.specificDrivePanelist);
      })
    }));
    
  }

  getSpecificCandidate(data:any){
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.specificCandidateService.specificCandidate(data).subscribe((res)=>{
        this.specificCandidateData = res;
      })
    }));
  }
  candidateDetails(data:any){
    console.log("aaaaaa  ",data);
    this.selectedCandidate=data;
  }

  coordinatorDetails(data:any){
    console.log("bbbbb  ",data);
    this.selectedCoordinator=data;
  }

  panelistDetails(data:any){
    console.log("ccccc  ",data);
    this.selectedPanelist=data;
  }
  onSubmitPanelData(data:any){
    data['candidate_name']=this.selectedCandidate;
    data['coordinator_name']=this.selectedCoordinator;
    data['panelist_name']=this.selectedPanelist;
    data['title']=this.driveTitle;
    console.log("hello show-panelist:   ",data);
    console.log("hello show-candidate:   ",data);
    console.log("hello show-coordinator:   ",data);
    console.log("Hello Data",data);
    this.panelService.postPanelData(data).subscribe((result)=>{
      console.warn(result);
      this.Paneldata=result;
    })
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);  
    });
  }

  isFormSelected(){
    if(this.formSelected==true){
      return true;
    }else{
      return false;
    }
  }
}
