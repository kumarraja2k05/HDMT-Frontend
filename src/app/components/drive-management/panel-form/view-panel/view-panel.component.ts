import { Component,OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { PanelDataService } from 'src/app/services/panel-data.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { IncludeService } from 'src/app/services/include.service';
import { SpecificDriveService } from 'src/app/services/specific-drive.service';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { SpecifcPanelService } from 'src/app/services/specifc-panel.service';
import settings from 'src/assets/settings.json';
import { SpecificPanelCandidateService } from 'src/app/services/specific-panel-candidate.service';


declare var window: any;

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

  driveTitle:any;
  specificDrive:any;

  roundTitle:any;
  roundTime:any;
  roundDate:any;
  panelTitle:any=[];
  
  hiringDrives:any;
  display:any=[];
  settingsFile:any = settings;
  firstCall:any;
  feedbackFormModal: any;
  feedbackData:any;
  selectStatus:any;
  viewFeedbackForm:any;
  specificPaneldata:any;
  
  feedBackArr:any=[];
  candidateEmail:any=[];
  candidatePhone:any=[];
  candidateName:any=[];
  interviewStartTime:any=[];
  interviewEndTime:any=[];
  panelIndexVal:any;
  candidateIndexVal:any;
  panelCandidateData:any;

  constructor(private router:Router,private specificPanelCandidateService:SpecificPanelCandidateService,private panelService: PanelDataService,private specificPanelCandidate: SpecificPanelCandidateService,private hiringDriveService: HringDriveService,private specificPanelService:SpecifcPanelService,private specificDriveService: SpecificDriveService,private tokenService:TokenServiceService,private includeService:IncludeService){
    this.hiringDriveService.hiring_drives().subscribe((result)=>{
      this.hiringDrives=result;
      this.firstCall = this.hiringDrives[0].sk
      this.driveTitle=this.firstCall + " Hiring Drive Panels";
    this.specificDriveService.specificHiringDrive(this.firstCall).subscribe((record)=>{
      this.specificDrive = record;
      
      // this.getSpecificCandidate(this.specificDrive[0].entity);
      // this.getSpecificDrivePanelist(data);
      // this.getSpecificPanel(data);
      console.log(Auth.currentSession().then((result)=>{
        this.tokenService.setToken(result.getIdToken().getJwtToken());
        this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
        this.specificPanelService.specificPanel(this.firstCall).subscribe((res)=>{
          this.panelData=res;
          console.log("jjjj ",this.panelData);
          for(let item of this.panelData){
            this.display.push(false);
          }
        })
      }));
    })  
      
    })
  }

  ngOnInit(){
    this.feedbackFormModal = new window.bootstrap.Modal(
      document.getElementById('panelModal')
    );
    this.viewFeedbackForm = new window.bootstrap.Modal(
      document.getElementById('viewFeedbackModal')
    );
    
  }
  
  ngDoCheck(): void {
    this.viewPanelSideBarStatus=true;
    this.includeService.viewPanelList=this.viewPanelSideBarStatus;
  }

  ngOnDestroy(){
    this.viewPanelSideBarStatus=false;
    this.includeService.viewPanelList=this.viewPanelSideBarStatus;
  }

  getSpecificDrive(data:any)
  {
    this.driveTitle=data + " Hiring Drive Panels";
    this.specificDriveService.specificHiringDrive(data).subscribe((record)=>{
      this.specificDrive = record;
      console.log("yyyy ",data,this.specificDrive);
      // this.getSpecificCandidate(this.specificDrive[0].entity);
      // this.getSpecificDrivePanelist(data);
      this.getSpecificPanel(data);
    })  
  }

  getSpecificPanel(data:any){
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.specificPanelService.specificPanel(data).subscribe((res)=>{
        this.panelData=res;
        console.log("iiii ",this.panelData);
        for(let item of this.panelData){
          this.display.push(false);
        }
      })
    }));

    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }

  getSpecificRound(data:any){
    console.log("Hello title: ",data);
    this.roundTitle=data;
    
    for(let item of this.panelData){
      if(item.panel_round===data){
        this.roundDate=item.panel_round_date;
        this.roundTime=item.panel_round_time;
      }
      this.candidateEmail.push(item.candidate_email);
      this.candidateName.push(item.candidate_name);
      this.candidatePhone.push(item.candidate_phone);
      this.interviewEndTime.push(item.candidate_end_interview);
      this.interviewStartTime.push(item.candidate_start_interview);
      this.panelTitle.push(item.panel_title);
    }
    
    console.log("!!!!!!!!!!!!!!!!!!!");
    console.log(this.roundDate,this.roundTime);
    console.log(this.candidateEmail,this.candidateName,this.candidatePhone,this.interviewEndTime,this.interviewStartTime);
    // this.getFeedbackDetails();
  }

  checkIndex(val:any){
    // console.log("clicked.. ", val);
    // console.log("rrrr ",this.display);
    for(let i in this.display){
      // console.log(this.display[i],i);
      if(i==val){
        this.display[i]=true;
      }else{
        this.display[i]=false;
      }
    }
    console.log("qqqq ",this.display);
  }

  checkSelected(val:any){
    if(val===this.candidateIndexVal){
      return true;
    }
    return false;
  }

  savePanelFeedback(){
    this.feedbackFormModal.hide();
  }

  resetUserForm(userForm: NgForm) {
    userForm.resetForm();
  }

  postFeedbackData(data: any){
    console.log("vvvv ",data);
    this.feedbackData=data.feedback;
    this.selectStatus=data.status;
    data["candidate_email"]=this.candidateEmail[this.panelIndexVal][this.candidateIndexVal];
    data["candidate_interview_time"]=this.interviewStartTime[this.panelIndexVal][this.candidateIndexVal]+" to "+this.interviewEndTime[this.panelIndexVal][this.candidateIndexVal];
    data["candidate_interview_date"]=this.roundDate;
    data["panel_title"]=this.panelTitle[this.panelIndexVal];
    data["round_title"]=this.roundTitle;
    console.log("mmm ",this.feedbackData);
    console.log("nnnn ",this.selectStatus);
    console.log("hello data: ",data);
    this.specificPanelCandidate.postSpecificPanelCandidate(data).subscribe((result)=>{
      console.warn(result);
      this.specificPaneldata=result;
    })
  }

  getFeedbackDetails(){
    // for(let item of this.specificCandidateData){
    //   console.log("ttttt ",item.candidate_email);
    //   this.specificPanelCandidateService.getSpecificPanelCandidate(item.candidate_email).subscribe((res)=>{
    //       // this.panelCandidateData.push(res);
    //       console.log("eeeee ",res);
    //   })
    // }
    this.specificPanelCandidateService.getSpecificPanelCandidate(this.candidateEmail[this.panelIndexVal][this.candidateIndexVal]).subscribe((res)=>{
      this.panelCandidateData=res;
      console.log("fffff ",res);
      // for(let item of this.panelCandidateData){
      //   this.feedbackData=item.feedback;
      //   this.selectStatus=item.status;
      // }
      console.log("tttt ",this.feedbackData,this.selectStatus);
    })
  }

  openFeedbackForm(i:any,j:any) {
    this.feedbackFormModal.show();
    this.panelIndexVal=i;
    this.feedbackData="";
    this.selectStatus="";
    this.candidateIndexVal=j;
    console.log(i,j);
    console.log("*****#########");
    console.log(this.candidateEmail[this.panelIndexVal][this.candidateIndexVal],this.candidateName[this.panelIndexVal][this.candidateIndexVal],this.candidatePhone[this.panelIndexVal][this.candidateIndexVal],this.interviewEndTime[this.panelIndexVal][this.candidateIndexVal],this.interviewStartTime[this.panelIndexVal][this.candidateIndexVal]);
  }

  viewFeedback(i:any,j:any){
    if(j===this.candidateIndexVal){
      this.viewFeedbackForm.show();
    }
  }
}
