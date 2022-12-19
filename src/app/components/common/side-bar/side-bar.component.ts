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

  ngOnInit(){
    
  }

  ngDoCheck(){
    this.HomeStatus=this.includeService.homeSidebarStatus;
    this.DriveManage=this.includeService.driveManageSideBarStatus;
    this.PanelistFormStatus=this.includeService.panelistSidebarStatus;
    this.EntityFormStatus=this.includeService.entitySideBarStatus;
    this.PanelFormStatus=this.includeService.panelSideBarStatus;
    console.log("######### ",this.HomeStatus," ",this.DriveManage," ",this.PanelistFormStatus," ",this.EntityFormStatus," ",this.PanelFormStatus);
  }

  list=[
    {
      number:1,
       name: 'Dashboard',
       icon: 'fa-solid fa-house',
    },
    {
      number:2,
       name: 'Panelist',
       icon: 'fa-solid fa-user',
    },
    {
      number:3,
       name: 'Entity',
       icon: 'fa-solid fa-address-card',
    }
  ];

  list2=[
    {
      number: 1,
       name: 'Hiring Drive List',
       icon: 'glyphicon glyphicon-th'
    },
    {
      number: 2,
       name: 'Hiring Drive Info',
       icon: 'glyphicon glyphicon-italic'
    },
    {
      number: 3,
       name: 'Manage Candidate',
       icon: 'glyphicon glyphicon-inbox'
    },
    {
      number: 4,
       name: 'Manage Panelist',
       icon: 'glyphicon glyphicon-user'
    },
    {
      number: 5,
       name: 'Interview Panel',
       icon: 'glyphicon glyphicon-globe'
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
    }else if(sidebarStatus==5){
      this.router.navigate(['/panel-form']);
    }
  }
}
