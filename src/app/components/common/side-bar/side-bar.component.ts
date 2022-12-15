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

  ngOnInit(){
    this.HomeStatus=this.includeService.homeSidebarStatus;
    this.DriveManage=this.includeService.driveManageSideBarStatus;
    this.PanelistFormStatus=this.includeService.panelistSidebarStatus;
    // console.log("????? ",this.HomeStatus," ",this.DriveManage);
  }

  ngDoCheck(){
    console.log("&&&&& ",this.DriveManage);
    if(this.HomeStatus==true){
      this.DriveManage=true;
    }
    console.log("???????? ",this.DriveManage);
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
      number:'1',
       name: 'Hiring Drive List',
       icon: 'glyphicon glyphicon-th'
    },
    {
      number:'2',
       name: 'Hiring Drive Info',
       icon: 'glyphicon glyphicon-italic'
    },
    {
      number:'3',
       name: 'Manage Candidate',
       icon: 'glyphicon glyphicon-inbox'
    },
    {
      number:'4',
       name: 'Manage Panelist',
       icon: 'glyphicon glyphicon-user'
    },
    {
      number:'5',
       name: 'Interview Panel',
       icon: 'glyphicon glyphicon-globe'
    }
  ];
  // @Input()  sideNavStatus:boolean=false;

  public clicked(status:number){
    if(status==1){
      this.router.navigate(['/home']);
    }else if(status==2){
      
      this.router.navigate(['/panelist-form']);
    }else{status==3}{

    }
  }
}
