import { Component,OnInit } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';

@Component({
  selector: 'app-drive-management',
  templateUrl: './drive-management.component.html',
  styleUrls: ['./drive-management.component.css']
})
export class DriveManagementComponent implements OnInit {
  driveManagementSideBar:boolean= false;

  constructor(private includeService:IncludeService){}

  ngOnInit(): void {
    this.driveManagementSideBar=true;
    this.includeService.driveManageSideBarStatus=this.driveManagementSideBar;
    console.log("rrrrr ",this.driveManagementSideBar);
  }
}
