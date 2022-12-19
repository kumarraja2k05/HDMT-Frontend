import { Component } from '@angular/core';
import { DriveDates } from 'src/app/models/drive-dates';
declare var window: any;

@Component({
  selector: 'app-hiring-drive-form',
  templateUrl: './hiring-drive-form.component.html',
  styleUrls: ['./hiring-drive-form.component.css']
})
export class HiringDriveFormComponent {
  panelistformModal: any;
  drive = new DriveDates();
  driveDates:any=[];
  constructor() {}

  ngOnInit(): void {
    this.driveDates.push(this.drive);
    this.panelistformModal = new window.bootstrap.Modal(
      document.getElementById('HiringDriveModal')
    );
  }
  
  openHirirngDriveFormModal() {
    this.panelistformModal.show();
  }
  saveDrive() {
    // confirm or save something
    this.panelistformModal.hide();
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
}
