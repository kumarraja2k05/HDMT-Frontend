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
import * as moment from 'moment';

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
      this.getSpecificCandidate(this.specificDrive[0].entity);
      this.getSpecificDrivePanelist(data);
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
        console.log("111111 ",this.specificCandidateData);
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
    console.log("ggggg ",this.specificDrive[0].round);
    var temp=this.specificDrive[0].round;
    var date:any;
    var time:any;
    var day: any;
    var startInterviewTime=[];
    var endInterviewTime=[];
    var candidateEmail:any=[];
    var candidatePhone:any=[];

    for(let j in temp){
      if(temp[j]['round'+j].roundName===data['panel_round']){
        // console.log("4444444444444444")
        date=temp[j]['round'+j].roundDate;
        time=temp[j]['round'+j].roundTime;
        break;
      }
    }
    // console.log("2222222222222222222");
    var startTime=time;
    for(let i in this.selectedCandidate){
      for (let j in this.specificCandidateData){
        // console.log("////////////////////");
        // console.log(this.selectedCandidate[i]);
        // console.log(this.specificCandidateData[j].candidate_first_name+this.specificCandidateData[j].candidate_last_name);
        // console.log(this.specificCandidateData[j]);
        if(this.specificCandidateData[j].candidate_first_name+this.specificCandidateData[j].candidate_last_name===this.selectedCandidate[i]){
          candidateEmail.push(this.specificCandidateData[j].candidate_email);
          candidatePhone.push(this.specificCandidateData[j].candidate_contact);
          // interviewTime.push(time);
          // console.log("hhhhh",time,moment.duration(time).asMinutes(),moment.duration("01:00").asMinutes());
          startInterviewTime.push(startTime);
          console.log("start time: ",startTime);
          var endTime=moment.duration(startTime).asMinutes() + moment.duration("01:00").asMinutes();
          console.log(endTime);
          var end=this.timeConvert1(endTime);
          console.log("endtime: ",end);
          endInterviewTime.push(end);
          startTime=moment.duration(end).asMinutes() + moment.duration("00:15").asMinutes();
          startTime=this.timeConvert1(startTime);
        }
      }
    }
    console.log(candidateEmail,candidatePhone,this.selectedCandidate,startInterviewTime,endInterviewTime);
    // console.log("555555 ",data['panel_round'],date,time);
    data['panel_round_date']=date;
    data['panel_round_time']=time;
    data['candidate_name']=this.selectedCandidate;
    data['coordinator_name']=this.selectedCoordinator;
    data['panelist_name']=this.selectedPanelist;
    data['title']=this.driveTitle;
    data['candidate_email']=candidateEmail;
    data['candidate_phone']=candidatePhone;
    data['candidate_start_interview']=startInterviewTime;
    data['candidate_end_interview']=endInterviewTime;

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

  timeConvert1(mins:any) {
    function z(n:any){return (n<10? '0':'') + n;}
    var h = (mins/60 |0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
  }

  isFormSelected(){
    if(this.formSelected==true){
      return true;
    }else{
      return false;
    }
  }
}
