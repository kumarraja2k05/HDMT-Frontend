import { Component,OnInit } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { IncludeService } from 'src/app/services/include.service';
import { Router } from '@angular/router';
declare var window: any;

@Component({
  selector: 'app-panelist-form',
  templateUrl: './panelist-form.component.html',
  styleUrls: ['./panelist-form.component.css']
})
export class PanelistFormComponent implements OnInit {
  panelistformModal: any;  
  panelistData:any;
  PanlistsideNavStatus:boolean=false;
  ngOnInit(){
    
  }

  constructor(private panelistService:PanelistDataService,private includeService:IncludeService){
      this.panelistService.panelists().subscribe((result)=>{
      this.panelistData =result;
    }
  )}

  ngDoCheck(): void {
    this.panelistformModal = new window.bootstrap.Modal(
      document.getElementById('panelistModal')
    );
    this.PanlistsideNavStatus=true;
    this.includeService.panelistSidebarStatus=this.PanlistsideNavStatus;
  }
  
  ngOnDestroy(){
    this.PanlistsideNavStatus=false;
    this.includeService.panelistSidebarStatus=this.PanlistsideNavStatus;
  }
  openPanelistFormModal() {
    this.panelistformModal.show();
  }

  savePanelist() {
    this.panelistformModal.hide();
  }

  getPanelistData(data:any)
  {
    console.warn(data);
    this.panelistService.savePanelistData(data).subscribe((result)=>{
      console.warn(result);
    })
  }


}
