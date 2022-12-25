import { Component, Input } from '@angular/core';
import { DriveDates } from 'src/app/models/drive-dates';
import {Subject} from 'rxjs';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import {DataTableDirective} from 'angular-datatables';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { IncludeService } from 'src/app/services/include.service';
import { EntityDataService } from 'src/app/services/entity-data.service';
import { Contact } from 'src/app/models/contacts';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';

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

  // panelistData:any;
  entityData: any;
  contact = new Contact();
  contactPersons:any=[];

  constructor(private router:Router,private tokenService:TokenServiceService,private driveService:HringDriveService,private panelistDataService:PanelistDataService,private entityDataService:EntityDataService,private includeService:IncludeService) {
    
    // this.panelistDataService.panelists().subscribe((panelists)=>{
    //   this.panelistData =panelists;
    // })
    
  }

  ngOnInit(): void {
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.entityDataService.entitylists().subscribe((entities)=>{
        this.entityData =entities;
      })
    }));
    this.driveDates.push(this.drive);
    this.contactPersons.push(this.contact);
  }

  ngDoCheck(){
    this.addDriveNavStatus=true;
    this.includeService.addDriveList=this.addDriveNavStatus;
    // this.driveService.getData=this.Drivedata;
  }

  ngOnDestroy(){
    this.addDriveNavStatus=false;
    this.includeService.addDriveList=this.addDriveNavStatus;
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
    })
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);  
    });
  }

  addContact()
  {
    this.contact=new Contact();
    this.contactPersons.push(this.contact);
  }

}
