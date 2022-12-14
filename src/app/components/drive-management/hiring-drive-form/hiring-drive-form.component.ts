import { Component } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-hiring-drive-form',
  templateUrl: './hiring-drive-form.component.html',
  styleUrls: ['./hiring-drive-form.component.css']
})
export class HiringDriveFormComponent {
  panelistformModal: any;
 
  constructor() {}

  ngOnInit(): void {
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
}
