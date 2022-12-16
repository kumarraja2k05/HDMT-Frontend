import { Component,OnInit,OnDestroy, ViewChild } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';
import { EntityDataService } from 'src/app/services/entity-data.service';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
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
  dtOptions:DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  // @ViewChild(DataTableDirective, {static: false})
  // datatableElement: any = DataTableDirective;
  // min: any = 0;
  // max: any = 0;

  constructor(private entityService:EntityDataService,private includeService:IncludeService){this.entityService.entitylists().subscribe((result)=>{
    this.EntityData =result;
  })}

  ngOnInit(): void {
    this.entityFormModal = new window.bootstrap.Modal(
      document.getElementById('entityModal')
    );
    this.dtOptions={
      pagingType: "full_numbers",
      pageLength: 3,
      processing: true
    };

    // $.fn.dataTable.ext.search.push((settings: any, data: string[], dataIndex: any) => {
    //   const id = parseFloat(data[0]) || 0; // use data for the id column
    //   return (Number.isNaN(this.min) && Number.isNaN(this.max)) ||
    //       (Number.isNaN(this.min) && id <= this.max) ||
    //       (this.min <= id && Number.isNaN(this.max)) ||
    //       (this.min <= id && id <= this.max);
    // });
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
    console.warn(data);
    this.entityService.saveEntityData(data).subscribe((EntityData)=>{
      console.warn(EntityData);
      // this.dtTrigger.next();
    })
  }

  // $=require( 'jquery' );

  // var dt = require( 'datatables.net' )();

  // $(document).ready( function () {
  //   $('#table_id').DataTable();
  // });

  // $(document).ready( function () {
  //   $('#myTable').DataTable();
  // } );

}
