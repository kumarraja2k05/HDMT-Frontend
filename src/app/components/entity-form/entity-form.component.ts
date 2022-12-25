import { Component,OnInit,OnDestroy, ViewChild } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';
import { EntityDataService } from 'src/app/services/entity-data.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenRefreshService } from 'src/app/services/token-refresh.service';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { Auth } from 'aws-amplify';
import { Contact } from 'src/app/models/contacts';
// import $ = require("jquery");
// import $ from "jquery";

declare var window: any;

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit{
  entityFormModal:any;
  EntityData: any;
  EntitysideNavStatus:boolean=false;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  contact = new Contact();
  contactPersons:any=[];

  constructor(private http: HttpClient,private tokenService:TokenServiceService,private entityService:EntityDataService,private includeService:IncludeService,private router:Router){
    // this.tokenService.includeAuth();
    
  }

  ngOnInit(): void {
    console.log(Auth.currentSession().then((result)=>{
      // environment.jwtToken=result.getIdToken().getJwtToken();
      // console.log(environment.jwtToken);
      console.log("\n############################################\n");
      console.log(result.getIdToken().getJwtToken());
      console.log("\n********************************************\n");
      console.log(result.getRefreshToken().getToken());
      console.log("\n********************************************\n");
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.entityService.entitylists().subscribe( (result) =>{
        this.EntityData = result;
        this.dtTrigger.next(null);
      });
    }));
    // console.log("aaaaaaa ",this.tokenService.getRefreshToken());
    // console.log("bbbbbbb ",this.tokenService.getToken());

    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };

    this.entityFormModal = new window.bootstrap.Modal(
      document.getElementById('entityModal')
    );
    this.contactPersons.push(this.contact);
  }

  ngDoCheck(){
    this.EntitysideNavStatus=true;
    this.includeService.entitySideBarStatus=this.EntitysideNavStatus;
  }

  ngOnDestroy(){
    this.EntitysideNavStatus=false;
    this.includeService.entitySideBarStatus=this.EntitysideNavStatus;
    this.dtTrigger.unsubscribe();
  }

  openEntityFormModal(){
    this.entityFormModal.show();
  }

  saveEntity(){
    this.entityFormModal.hide();
    this.router.navigate(['/entity-form']);
  }

  getEntityData(data:any){
    console.warn(data);
    this.entityService.saveEntityData(data).subscribe((EntityData)=>{
      console.warn(EntityData);
    })
    // this.router.navigate(['/entity-form']);
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);  
    });
  }

  addContact()
  {
    this.contact=new Contact();
    this.contactPersons.push(this.contact);
  }
}
