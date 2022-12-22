import { Injectable } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { DriveManagementComponent } from '../components/drive-management/drive-management.component';

@Injectable({
  providedIn: 'root'
})
export class IncludeService {

  constructor() { }
  public homeSidebarStatus:Boolean | undefined;
  public driveManageSideBarStatus: Boolean | undefined;
  public panelistSidebarStatus: Boolean | undefined;
  public entitySideBarStatus: Boolean | undefined;
  public panelSideBarStatus:Boolean | undefined;
  public viewDriveList:Boolean | undefined;
  public addDriveList:Boolean | undefined;
  public singlrDriveInfo: Boolean | undefined;

  public HomeSideBar(data:boolean){
    this.homeSidebarStatus=data;
    return this.homeSidebarStatus;
  }

  public DriveManageSideBar(val:boolean){
    this.driveManageSideBarStatus=val;
    return this.driveManageSideBarStatus;
  }
}
