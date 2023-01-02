import { Component } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';

declare var window: any;

@Component({
  selector: 'app-panel-form',
  templateUrl: './panel-form.component.html',
  styleUrls: ['./panel-form.component.css']
})
export class PanelFormComponent {
  panelformModal: any;
  panelData:any;
  PanelSideNavStatus:boolean=false;

  constructor(private includeService:IncludeService) {}

  ngDoCheck(): void {
    // this.panelformModal = new window.bootstrap.Modal(
    //   document.getElementById('myModal')
    // );
    this.PanelSideNavStatus=true;
    this.includeService.panelSideBarStatus=this.PanelSideNavStatus;
    console.log("************ ",this.PanelSideNavStatus,this.includeService.panelistSidebarStatus);
  }
  
  ngOnDestroy(){
    this.PanelSideNavStatus=false;
    this.includeService.panelSideBarStatus=this.PanelSideNavStatus;
    console.log("/////////////// ",this.PanelSideNavStatus," ",this.includeService.panelistSidebarStatus);
  }
 
  ngOnInit(): void {
    
  }
  
  openFormModal() {
    this.panelformModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.panelformModal.hide();
  }
}
