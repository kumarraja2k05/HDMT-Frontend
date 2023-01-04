import { Component,OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';

declare var window: any;

@Component({
  selector: 'app-show-panelist',
  templateUrl: './show-panelist.component.html',
  styleUrls: ['./show-panelist.component.css']
})
export class ShowPanelistComponent {
  @Input() panelistData:any;
  panelistFormModal:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  panelistArr:any=[];
  result:any=[];
  @Output() panelistRecord=new EventEmitter<any>();

  constructor(private tokenService: TokenServiceService){}

  ngOnInit(): void {
    // this.dtTrigger.next(null);
    this.panelistData=[];
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20]
    };
    this.panelistFormModal = new window.bootstrap.Modal(
      document.getElementById('PanelistModal')
    );
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();;
  }

  openPanelistFormModal(){
    this.panelistFormModal.show();
    this.getPanelistData(this.panelistData);
  }

  getPanelistData(panelist:any){
    console.log("rrrrr: ",panelist);
    var dataPanelist=panelist[0].specificDrivePanelist;
    this.panelistArr=[];
    for(let i in dataPanelist){
      this.panelistArr.push({id: i, panelistName: dataPanelist[i].panelist.panelistName, isSelected: false});
    }
    console.log("ppppp ",this.panelistArr);
  }

  onCheckboxChange()
  {
    console.log(this.panelistArr);
  }

  getSelectedData(data:any){
    for(let i in this.panelistArr){
      if(this.panelistArr[i].isSelected===true){
        this.result.push(this.panelistArr[i].panelistName);
      }
    }
    console.log(this.result);
    this.sendPanelist(this.result);
    
  }

  sendPanelist(val: any) {
    this.panelistRecord.emit(val);
  }
}

class Panelist{
  id!: number;
  panelistName!: string;
  isSelected!: boolean;
}

