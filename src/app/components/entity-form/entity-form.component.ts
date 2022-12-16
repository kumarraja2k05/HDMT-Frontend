import { Component,OnInit } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';
import { EntityDataService } from 'src/app/services/entity-data.service'

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

  constructor(private entityService:EntityDataService,private includeService:IncludeService){this.entityService.entitylists().subscribe((result)=>{
    this.EntityData =result;
  })}

  ngOnInit(): void {
    this.entityFormModal = new window.bootstrap.Modal(
      document.getElementById('entityModal')
    );
    
  }

  ngDoCheck(){
    this.EntitysideNavStatus=true;
    this.includeService.entitySideBarStatus=this.EntitysideNavStatus;
  }

  ngOnDestroy(){
    this.EntitysideNavStatus=false;
    this.includeService.entitySideBarStatus=this.EntitysideNavStatus;
  }

  openEntityFormModal(){
    this.entityFormModal.show();
  }

  saveEntity(){
    this.entityFormModal.hide();
  }

  getEntityData(data:any){
    console.warn(data);
    this.entityService.saveEntityData(data).subscribe((result)=>{
      console.warn(result);
    })
  }
}
