import { Component,OnInit,Input } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { SpecificDrivePanelistService } from 'src/app/services/specific-drive-panelist.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import { DataTablesModule } from 'angular-datatables';

declare var window: any;

@Component({
  selector: 'app-show-drive-panelist',
  templateUrl: './show-drive-panelist.component.html',
  styleUrls: ['./show-drive-panelist.component.css']
})
export class ShowDrivePanelistComponent implements OnInit{

  constructor(private panelistDataService:PanelistDataService, private router:Router,private specificDrivePanelistDataService: SpecificDrivePanelistService,private tokenService: TokenServiceService){}

  specificDrivePanelistFormModal:any;
  panelistData:any;
  specificPanelistArr:any=[];
  drivePanelistData:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  result:any=[];
  @Input() driveTitle="";

  ngOnInit(){
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.panelistDataService.panelists().subscribe((panelists)=>{
        this.panelistData =panelists;
        this.getPanelistData(this.panelistData);
        this.dtTrigger.next(null);
      })
    }));
    this.specificDrivePanelistFormModal = new window.bootstrap.Modal(
      document.getElementById('specificDrivePanelistModal')
    );
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20]
    };
  }

  openSpecificPanelistFormModal(){
    this.specificDrivePanelistFormModal.show();
  }

  saveSpecificDrivePanelist(){
    this.specificDrivePanelistFormModal.hide();
  }

  getPanelistData(drivePanelist:any){
    for(let i in drivePanelist){
      if(drivePanelist[i]["custom:role"]=='panelist'){
        this.specificPanelistArr.push({id: i, panelistName: drivePanelist[i].name, panelistEmail: drivePanelist[i].email, panelistPhone: drivePanelist[i].phone_number, isSelected: false});
      }
    }
    console.log("******************************");
    console.log(this.specificPanelistArr);
  }

  onCheckboxChange()
  {
    console.log(this.specificPanelistArr);
  }

  getSpecificDrivePanelistData(data:any){
    for(let i in this.specificPanelistArr){
      console.log("ppppp ",this.specificPanelistArr[i],i);
      if(this.specificPanelistArr[i].isSelected===true){
        this.result.push({["panelist"]: this.specificPanelistArr[i]});
      }
    }
    console.log(this.result);
    data['specificDrivePanelist']=this.result;
    data['title']=this.driveTitle;
    console.log("Hello Data yyyy:   ",data);

    this.specificDrivePanelistDataService.postSpecificDrivePanelistData(data).subscribe((res)=>{
      console.warn("hhhhhhhh ",res);
      this.drivePanelistData=res;
    })
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);  
    });
    console.log("submitted:    ",this.drivePanelistData);
  }
}
class DriveSpecificPanelist{
  id!: number;
  panelistName!: string;
  panelistEmail!: string;
  panelistPhone!: string;
  isSelected!: boolean;
}