import { Component,Input,OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';

declare var window: any;

@Component({
  selector: 'app-show-coordinators',
  templateUrl: './show-coordinators.component.html',
  styleUrls: ['./show-coordinators.component.css']
})
export class ShowCoordinatorsComponent  implements OnInit{
  @Input() coordinatorData:any;
  coordinatorFormModal:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  coordinatorArr:any=[];
  result:any=[];

  constructor(private tokenService: TokenServiceService){}

  ngOnInit(): void {
    this.dtTrigger.next(null);
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20]
    };
    this.coordinatorFormModal = new window.bootstrap.Modal(
      document.getElementById('coordinatorModal')
    );
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();;
  }

  openCoordinatorFormModal(){
    this.getCoordinatorData(this.coordinatorData);
    this.coordinatorFormModal.show();
  }

  getCoordinatorData(panelist:any){
    console.log("rrrrr: ",panelist);
    var dataPanelist=panelist[0].specificDrivePanelist;
    for(let i in dataPanelist){
      this.coordinatorArr.push({id: i, panelistName: dataPanelist[i].panelist.panelistName, isSelected: false});
    }
    console.log("ppppp ",this.coordinatorArr);
  }

  onCheckboxChange()
  {
    console.log(this.coordinatorArr);
  }

  getSelectedData(data:any){
    for(let i in this.coordinatorArr){
      if(this.coordinatorArr[i].isSelected===true){
        this.result.push(this.coordinatorArr[i].panelistName);
      }
    }
    console.log(this.result);
    data['panelist_name']=this.result;
    console.log("hello show-coordinator:   ",data);
  }
}


class Panelist{
  id!: number;
  panelistName!: string;
  isSelected!: boolean;
}
