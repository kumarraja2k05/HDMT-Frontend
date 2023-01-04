import { Component,OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { PanelDataService } from 'src/app/services/panel-data.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { IncludeService } from 'src/app/services/include.service';
import { SpecificDriveService } from 'src/app/services/specific-drive.service';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { SpecifcPanelService } from 'src/app/services/specifc-panel.service';

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
  roundTime:any;
  roundDate:any;
  hiringDrives:any;
  display:any=[];
  isDisplay: boolean=false;
  firstCall:any;
  constructor(private panelService: PanelDataService,private hiringDriveService: HringDriveService,private specificPanelService:SpecifcPanelService,private specificDriveService: SpecificDriveService,private tokenService:TokenServiceService,private includeService:IncludeService){
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
          console.log("iiii ",this.panelData);
          for(let item of this.panelData){
            this.display.push(false);
          }
        })
      }));
    })  
      
    })
  }

  ngOnInit(){

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
    for(let item of this.panelData){
      if(item.panel_round===data){
        this.roundDate=item.panel_round_date;
        this.roundTime=item.panel_round_time;
      }
    }
    console.log(this.roundDate,this.roundTime);
  }

  checkIndex(val:any){
    // console.log("clicked.. ", val);
    // this.isDisplay=true;
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
}
