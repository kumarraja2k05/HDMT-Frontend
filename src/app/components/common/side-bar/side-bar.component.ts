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
       route: '#'
    },
    {
      number: 5,
       name: 'Manage Panelist',
       icon: 'glyphicon glyphicon-user',
       route: '#'
    },
    {
      number: 6,
       name: 'Interview Panel',
       icon: 'glyphicon glyphicon-globe',
       route: '/panel-form'
    }
  ];
  // @Input()  sideNavStatus:boolean=false;

  public clicked(status:number){
    console.log("status:   ",status);
    if(status==1){
      this.router.navigate(['/home']);
    }else if(status==2){
      this.router.navigate(['/panelist-form']);
    }else{
      this.router.navigate(['/entity-form']);
    }
  }

  public secondListClicked(sidebarStatus: number){
    console.log("status:   ",sidebarStatus);
    if(sidebarStatus==1){
      this.router.navigate(['/drive-management']);
    }
    else if(sidebarStatus==2)
    {
      this.router.navigate(['/hiring-drive-info']);
    }
    else if(sidebarStatus==5){
      this.router.navigate(['/panel-form']);
    }
  }

  public checkMenuName(val:number)
  {
    if(val==1){
      return true;
    }
    return false;
}
}
