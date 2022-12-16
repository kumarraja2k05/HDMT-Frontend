import { Component,OnInit } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';

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

  constructor(private includeService:IncludeService){}

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

  getEntityData(){

  }
}
