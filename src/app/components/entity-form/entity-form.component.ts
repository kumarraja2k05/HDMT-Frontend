import { Component,OnInit,OnDestroy, ViewChild } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';
import { EntityDataService } from 'src/app/services/entity-data.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { Auth } from 'aws-amplify';
import { Contact } from 'src/app/models/contacts';
import { SpecificEntityService } from 'src/app/services/specific-entity.service';


declare var window: any;

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit{
  entityFormModal:any;
  editEntityFormModal:any;
  entityDataForm:any;
  EntityData: any;
  EntityName:any;
  specificEntityData:any;
  EntitysideNavStatus:boolean=false;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  contact = new Contact();
  contactPersons:any=[];
  finaContact:any=[];

  entityName:string="";
  entityType:string="";
  entityPlace:string="";
  constructor(private specificEntityService:SpecificEntityService,private http: HttpClient,private tokenService:TokenServiceService,private entityService:EntityDataService,private includeService:IncludeService,private router:Router){
    
  }

  ngOnInit(): void {
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.entityService.entitylists().subscribe( (result) =>{
        this.EntityData = result;
        this.dtTrigger.next(null);
      });
    }));
    

    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };

    this.entityFormModal = new window.bootstrap.Modal(
      document.getElementById('entityModal')
    );

    this.editEntityFormModal = new window.bootstrap.Modal(
      document.getElementById('editEntityModal')
    )

    this.entityDataForm = new window.bootstrap.Modal(
      document.getElementById('fullEntityData')
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
  }

  getEntityData(data:any){
    console.warn("Hello Data: ",data);
    console.log(this.contactPersons);
    for(let j in this.contactPersons){
      this.finaContact.push({["contact"+j]: this.contactPersons[j]});
    }
    data['contactDetails']=this.finaContact;
    this.entityService.saveEntityData(data).subscribe((EntityData)=>{
      console.warn(EntityData);
    })
    
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);  
    });
  }

  addContact()
  {
    this.contact=new Contact();
    this.contactPersons.push(this.contact);

    console.log("rrrrrr  ",this.contactPersons," ",this.contact);
  }

  removeContact(index:any)
  {
    this.contactPersons.splice(index,1);
  }
  checkIndex(val:number){
    if(val!=0){
      return true;
    }
    return false;
  }

  openEditEntityFormModal(){
    this.editEntityFormModal.show();
  }

  saveEditedEntity()
  {
    
    this.editEntityFormModal.hide();
  }

  updateEntityData(data:any)
  {
    console.log(data);
    this.entityService.updateEntityData(data).subscribe((EntityData)=>{
      console.warn(EntityData);
    })
  }

  replicateData(data:any)
  {
    this.entityName=data['entity_name']
    this.entityPlace=data['entity_place']
    this.entityType=data['entity_type']
    console.log(data)
  }

  viewRecord(data:any){
    this.entityDataForm.show();
    this.checkEntity(data);
  }
  checkEntity(data:any){
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.specificEntityService.specificEntity(data).subscribe((res)=>{
        this.specificEntityData = res;
      })
    }));
  }
}
