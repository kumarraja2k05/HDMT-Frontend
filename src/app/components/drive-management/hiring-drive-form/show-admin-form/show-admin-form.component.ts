import { Component,Output,EventEmitter } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';

declare var window: any;

@Component({
  selector: 'app-show-admin-form',
  templateUrl: './show-admin-form.component.html',
  styleUrls: ['./show-admin-form.component.css']
})
export class ShowAdminFormComponent {
  adminFormModal:any;
  panelistData:any;
  form!: FormGroup;
  result:any=[];
  adminArr:any=[];
  @Output() sendData=new EventEmitter<any>();
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private panelistDataService:PanelistDataService,private tokenService: TokenServiceService,private fb:FormBuilder){
    this.form=this.fb.group({
      checkArray: this.fb.array([]),
    })
    
  }
  ngOnInit(): void {
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.panelistDataService.panelists().subscribe((panelists)=>{
        this.panelistData =panelists;
        this.getPanelistData(this.panelistData);
        this.dtTrigger.next(null);
      })
    }));
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20]
    };
    this.adminFormModal = new window.bootstrap.Modal(
      document.getElementById('adminModal')
    );
  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();;
  }

  openAdminFormModal(){
    this.adminFormModal.show();
  }

  saveAdmin(){
    this.adminFormModal.hide();
  }
  getPanelistData(admin:any){
    for(let i in admin){
      this.adminArr.push({id: i, adminName: admin[i].panelist_first_name, isSelected: false});
    }
    
  }

  onCheckboxChange()
  {
    console.log(this.adminArr);
  }

  getAdminData(data:any){
    for(let i in this.adminArr){
      if(this.adminArr[i].isSelected===true){
        this.result.push(this.adminArr[i].adminName);
      }
    }
    console.log(this.result);
    this.adminSelect(this.result);
    data['admin']=this.result;
    console.log("hello show-admin:   ",data);
  }

  adminSelect(value: any) {
    this.sendData.emit(value);
  }

}

class Admin{
  id!: number;
  adminName!: string;
  isSelected!: boolean;
}