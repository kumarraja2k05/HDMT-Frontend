import { Component,OnInit } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { IncludeService } from 'src/app/services/include.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';

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
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private panelistService:PanelistDataService,private includeService:IncludeService){
      this.panelistService.panelists().subscribe((result)=>{
      this.panelistData =result;
      this.dtTrigger.next(null);
    });
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
    };
  }

  
  
  ngOnInit(){
    
  }
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
    this.dtTrigger.unsubscribe();
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
