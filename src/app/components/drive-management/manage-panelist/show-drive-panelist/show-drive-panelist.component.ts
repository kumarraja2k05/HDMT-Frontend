import { Component,OnInit,Input } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { SpecificDrivePanelistService } from 'src/app/services/specific-drive-panelist.service';
import { Router } from '@angular/router';

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
  result:any=[];
  @Input() driveTitle="";

  ngOnInit(){
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.panelistDataService.panelists().subscribe((panelists)=>{
        this.panelistData =panelists;
      })
    }));
    this.specificDrivePanelistFormModal = new window.bootstrap.Modal(
      document.getElementById('specificDrivePanelistModal')
    );
  }

  openSpecificPanelistFormModal(){
    this.getPanelistData(this.panelistData);
    this.specificDrivePanelistFormModal.show();
  }

  saveSpecificDrivePanelist(){
    this.specificDrivePanelistFormModal.hide();
  }

  getPanelistData(drivePanelist:any){
    for(let i in drivePanelist){
      this.specificPanelistArr.push({id: i, panelistName: drivePanelist[i].panelist_first_name, panelistEmail: drivePanelist[i].panelist_email, panelistPhone: drivePanelist[i].panelist_contact, isSelected: false});
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