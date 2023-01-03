import { Component,OnInit } from '@angular/core';
import { Input} from '@angular/core';
import { Router } from '@angular/router';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import { IncludeService } from 'src/app/services/include.service'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  constructor(public includeService: IncludeService, private router: Router){}
  
  HomeStatus:Boolean | undefined;
  DriveManage:Boolean | undefined;
  PanelistFormStatus: Boolean | undefined;
  EntityFormStatus:Boolean | undefined;
  PanelFormStatus: Boolean | undefined;
  viewDriveFormStatus: Boolean | undefined;
  addDriveFormStatus: Boolean | undefined;
  singledriveInfoStatus: Boolean | undefined;
  manageCandidateStatus: Boolean | undefined;
  managePanelistStatus: Boolean | undefined;
  viewPanelFormStataus: Boolean | undefined;

  ngOnInit(){
    
  }

  ngDoCheck(){
    this.HomeStatus=this.includeService.homeSidebarStatus;
    this.DriveManage=this.includeService.driveManageSideBarStatus;
    this.PanelistFormStatus=this.includeService.panelistSidebarStatus;
    this.EntityFormStatus=this.includeService.entitySideBarStatus;
    this.PanelFormStatus=this.includeService.panelSideBarStatus;
    this.viewDriveFormStatus=this.includeService.viewDriveList;
    this.addDriveFormStatus=this.includeService.addDriveList;
    this.singledriveInfoStatus=this.includeService.singlrDriveInfo;
    this.manageCandidateStatus=this.includeService.manageCandidateSideBarStatus;
    this.managePanelistStatus=this.includeService.managePanelistSideBarStatus;
    this.viewPanelFormStataus=this.includeService.viewPanelList;
    console.log("######### ",this.HomeStatus," ",this.DriveManage," ",this.PanelistFormStatus," ",this.EntityFormStatus," ",this.PanelFormStatus);
  }

  list=[
    {
      number:1,
       name: 'Dashboard',
       icon: 'fa-solid fa-house',
       route: '/home'
    },
    {
      number:2,
       name: 'Panelist',
       icon: 'fa-solid fa-user',
       route: '/panelist-form'
    },
    {
      number:3,
       name: 'Entity',
       icon: 'fa-solid fa-address-card',
       route: '/entity-form'
    }
  ];

  list2=[
    {
      number: 1,
       name: 'Hiring Drive Info',
       icon: 'glyphicon glyphicon-italic',
       route: '/hiring-drive-info'
    },
    {
      number: 2,
       name: 'Manage Candidate',
       icon: 'glyphicon glyphicon-inbox',
       route: '/manage-candidate'
    },
    {
      number: 5,
       name: 'Manage Panelist',
       icon: 'glyphicon glyphicon-user',
       route: '/manage-panelist'
    },
    {
      number: 6,
       name: 'Interview Panel',
       icon: 'glyphicon glyphicon-globe',
       route: '/panel-form'
    }
  ];
  // @Input()  sideNavStatus:boolean=false;

  public checkMenuName(val:number)
  {
    if(val==1){
      return true;
    }
    return false;
}
}
