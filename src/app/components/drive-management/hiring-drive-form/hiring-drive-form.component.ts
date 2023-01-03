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
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

declare var window: any;

@Component({
  selector: 'app-hiring-drive-form',
  templateUrl: './hiring-drive-form.component.html',
  styleUrls: ['./hiring-drive-form.component.css']
})

export class HiringDriveFormComponent {
  drive = new DriveDates();
  driveDates:any=[];
  finaDriveDates:any=[];
  driveformModal: any;
  Drivedata: any;
  resultAdmin: any;
  addDriveNavStatus: boolean=false;
  adminArray: any=[];
  adminData:any=[];
  // panelistData:any;
  entityData: any;
  contact = new Contact();
  contactPersons:any=[];
  date:any;
  time:any;
  datepipe: any;
  constructor(private router:Router,private tokenService:TokenServiceService,private driveService:HringDriveService,private panelistDataService:PanelistDataService,private entityDataService:EntityDataService,private includeService:IncludeService,private fb:FormBuilder) {
    
    // this.panelistDataService.panelists().subscribe((panelists)=>{
    //   this.panelistData =panelists;
    // })
  }

  ngOnInit(): void {
    this.date = new Date().toISOString().slice(0, 10);
    // this.time = this.datepipe.transform((new Date), 'h:mm');
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
    console.log("eeeeeewqq1qqqqqqqq ",this.driveDates);
  }

  removeDates(index:any)
  {
    this.driveDates.splice(index,1);
  }
  b:any;
  onSubmitDriveData(data:any)
  {
    console.log(data)
    for(let i in this.adminArray){
      if(this.adminArray[i].isSelected===true){
        this.adminData.push(this.adminArray[i].adminName);
      }
    }
    console.log("----------------------")
    for(let j in this.driveDates){
      console.log(this.driveDates[j],j)
      this.finaDriveDates.push({["round"+j]: this.driveDates[j]});
    }
    data['admin_data']=this.adminData;
    data['round']=this.finaDriveDates;

    console.log("Hello Data",data);
    // this.driveService.saveDriveData(data).subscribe((result)=>{
    //   console.warn(result);
    //   this.Drivedata=result;
    // })
    // const currentRoute = this.router.url;
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate([currentRoute]);  
    // });
  }

  addContact()
  {
    this.contact=new Contact();
    this.contactPersons.push(this.contact);
    console.log("hello data: ",this.contactPersons," ",this.contact)
  }

  checkIndex(val:number){
    if(val!=0){
      return true;
    }
    return false;
  }
  
  getPanelistAdminData(val:any){
    this.getAdminData(val);
  }

  getAdminData(admindata:any){
    // console.log('hello this is the form value',this.form.value);
    // this.resultAdmin = this.form.value.checkArray;
    
    for(let i in admindata){
      console.log("**********************");
      console.log(admindata[i]," ",i);

      this.adminArray.push({id: i, adminName: admindata[i], isSelected: true});
    }
    console.log(this.adminArray);
  }

  onCheckboxChange()
  {
    // const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    // if(e.target.checked)
    // {
    //   checkArray.push(new FormControl(e.target.value));
    // }
    console.log("/////////////////");
    console.log(this.adminArray);
  }
}

class Admin{
  id!: number;
  adminName!: string;
  isSelected!: boolean;
}