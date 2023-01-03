import { Injectable } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { DriveManagementComponent } from '../components/drive-management/drive-management.component';

import { TokenServiceService } from './token-service.service';
import { EntityDataService } from './entity-data.service';

@Injectable({
  providedIn: 'root'
})
export class IncludeService {

  constructor(private tokenService: TokenServiceService,private entityService:EntityDataService) { }
  public homeSidebarStatus:Boolean | undefined;
  public driveManageSideBarStatus: Boolean | undefined;
  public panelistSidebarStatus: Boolean | undefined;
  public entitySideBarStatus: Boolean | undefined;
  public panelSideBarStatus:Boolean | undefined;
  public viewDriveList:Boolean | undefined;
  public addDriveList:Boolean | undefined;
  public singlrDriveInfo: Boolean | undefined;
  public manageCandidateSideBarStatus: Boolean | undefined;
  public managePanelistSideBarStatus: Boolean | undefined;
  public viewPanelList: Boolean | undefined;
  
  ngOnInit(){

  }
  public HomeSideBar(data:boolean){
    this.homeSidebarStatus=data;
    return this.homeSidebarStatus;
  }

  public DriveManageSideBar(val:boolean){
    this.driveManageSideBarStatus=val;
    return this.driveManageSideBarStatus;
  }
}
