import { Component } from '@angular/core';
import { DriveDates } from 'src/app/models/drive-dates';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';

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
  dtOptions:DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private driveService:HringDriveService) {
    this.driveService.hiring_drives().subscribe((result)=>{
      this.Drivedata =result;
    })
  }

  ngOnInit(): void {
    this.driveDates.push(this.drive);
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
}
