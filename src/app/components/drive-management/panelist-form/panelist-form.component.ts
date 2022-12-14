import { Component } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';

declare var window: any;

@Component({
  selector: 'app-panelist-form',
  templateUrl: './panelist-form.component.html',
  styleUrls: ['./panelist-form.component.css']
})
export class PanelistFormComponent {
  panelistformModal: any;  
  panelistData:any;


  constructor(private panelistService:PanelistDataService){this.panelistService.panelists().subscribe((result)=>{
    this.panelistData =result;
  })}

  ngOnInit(): void {
    this.panelistformModal = new window.bootstrap.Modal(
      document.getElementById('panelistModal')
    );
  }
  
  openPanelistFormModal() {
    this.panelistformModal.show();
  }

  savePanelist() {
    // confirm or save something
    this.panelistformModal.hide();
    // console.warn(data);

  }

  getPanelistData(data:any)
  {
    console.warn(data);
    this.panelistService.savePanelistData(data).subscribe((result)=>{
      console.warn(result);
    })
  }

  
}
