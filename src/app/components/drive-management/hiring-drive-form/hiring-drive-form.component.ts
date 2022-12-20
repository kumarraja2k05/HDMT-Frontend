import { Component, Input } from '@angular/core';
import { DriveDates } from 'src/app/models/drive-dates';
import {Subject} from 'rxjs';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import {DataTableDirective} from 'angular-datatables';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { IncludeService } from 'src/app/services/include.service';
import { EntityDataService } from 'src/app/services/entity-data.service';
import { Contact } from 'src/app/models/contacts';

declare var window: any;

@Component({
  selector: 'app-hiring-drive-form',
  templateUrl: './hiring-drive-form.component.html',
  styleUrls: ['./hiring-drive-form.component.css']
})
export class HiringDriveFormComponent {
  drive = new DriveDates();
  driveDates:any=[];
  driveformModal: any;
  Drivedata: any;
  addDriveNavStatus: boolean=false;
  
  dtOptions:DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  panelistData:any;
  entityData: any;
  contact = new Contact();
  contactPersons:any=[];

  constructor(private driveService:HringDriveService,private panelistDataService:PanelistDataService,private entityDataService:EntityDataService,private includeService:IncludeService) {
    this.driveService.hiring_drives().subscribe((result)=>{
      this.Drivedata =result;
      this.driveService.getData=this.Drivedata;
      // console.log("******** ",this.driveService.getData,this.Drivedata);
      // console.log("####### ",this.Drivedata);
    }) 
    this.panelistDataService.panelists().subscribe((panelists)=>{
      this.panelistData =panelists;
    })
    this.entityDataService.entitylists().subscribe((entities)=>{
      this.entityData =entities;
    })
  }

  ngOnInit(): void {
    this.driveDates.push(this.drive);
    this.contactPersons.push(this.contact);
  }

  ngDoCheck(){
    this.addDriveNavStatus=true;
    this.includeService.addDriveList=this.addDriveNavStatus;

  }

  ngOnDestroy(){
    this.addDriveNavStatus=false;
    this.includeService.addDriveList=this.addDriveNavStatus;
    this.dtTrigger.unsubscribe();
  }


  addDates()
  {
    this.drive= new DriveDates();
    this.driveDates.push(this.drive);
  }

  removeDates(index:any)
  {
    this.driveDates.splice(index,1);
  }

  onSubmitDriveData(data:any)
  {
    this.driveService.saveDriveData(data).subscribe((result)=>{
      console.warn(result);
      this.Drivedata=result;
      // this.dtTrigger.next();
    })
  }

  addContact()
  {
    this.contact=new Contact();
    this.contactPersons.push(this.contact);
  }

}
