import { Component,OnInit } from '@angular/core';
import { Input} from '@angular/core';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import { IncludeService } from 'src/app/services/include.service'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  constructor(public includeService: IncludeService){}
  
  HomeStatus:Boolean | undefined;
  DriveManage:Boolean | undefined;
  ngOnInit(){
    this.HomeStatus=this.includeService.homeSidebarStatus;
    this.DriveManage=this.includeService.driveManageSideBarStatus;
    // console.log("????? ",this.HomeStatus," ",this.DriveManage);
  }

  ngOnChanges(){
    // console.log("ppppp ",this.selectStatus);
  }
  list=[
    {
      number:'1',
       name: 'Home',
       icon: 'fa-solid fa-house',
    },
    {
      number:'2',
       name: 'Profile',
       icon: 'fa-solid fa-user',
    },
    {
      number:'3',
       name: 'About',
       icon: 'fa-solid fa-house',
    },
    {
      number:'4',
       name: 'Contact',
       icon: 'fa-solid fa-address-card',
    },
    {
      number:'5',
       name: 'Help',
       icon: 'fa-sharp fa-solid fa-info',
    }
  ];

  list2=[
    {
      number:'1',
       name: 'Hiring Drive List'
    },
    {
      number:'2',
       name: 'Hiring Drive Info'
    },
    {
      number:'3',
       name: 'Manage Candidate'
    },
    {
      number:'4',
       name: 'Manage Panelist'
    },
    {
      number:'5',
       name: 'Interview Panel'
    }
  ];
  // @Input()  sideNavStatus:boolean=false;
}
