import { Component,OnInit } from '@angular/core';
import { IncludeService } from 'src/app/services/include.service';
import { SpecificDriveService } from 'src/app/services/specific-drive.service';
import { HringDriveService } from 'src/app/services/hring-drive.service';
import { CandidateDataService } from 'src/app/services/candidate-data.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables';
import { map } from 'rxjs/operators';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { Auth } from 'aws-amplify';
import { EntityDataService } from 'src/app/services/entity-data.service';
import { SpecificCandidateService } from 'src/app/services/specific-candidate.service';
import { CsvService } from 'src/app/services/csv.service';

declare var window: any;

@Component({
  selector: 'app-manage-candidate',
  templateUrl: './manage-candidate.component.html',
  styleUrls: ['./manage-candidate.component.css']
})
export class ManageCandidateComponent implements OnInit{

  constructor(private csvService:CsvService,private router:Router,private specificCandidateService: SpecificCandidateService,private entityDataService: EntityDataService ,private tokenService:TokenServiceService ,private includeService: IncludeService,private specificDriveService:SpecificDriveService,private hiringDriveService:HringDriveService,private candidateService:CandidateDataService){
    // console.log(Auth.currentSession().then((result)=>{
    //   this.tokenService.setToken(result.getIdToken().getJwtToken());
    //   this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
    //   this.hiringDriveService.hiring_drives().subscribe((result)=>{
    //     this.hiringDrives=result;
    //   })
    //   console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    // }));

    this.hiringDriveService.hiring_drives().subscribe((result)=>{
      this.hiringDrives=result;
    })

  }

  candiadteformModal: any;
  manageCandidateSideBar:boolean= false;
  hiringDrives:any;
  driveTitle: any;
  specificDriveData:any;
  candidateData: any;
  specificCandidateData: any;
  entityData: any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.manageCandidateSideBar=true;
    this.includeService.manageCandidateSideBarStatus=this.manageCandidateSideBar;

    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.entityDataService.entitylists().subscribe((entities)=>{
        this.entityData =entities;
      })
      this.candidateService.candidate_list().subscribe((result) =>{
        this.candidateData = result;
        this.dtTrigger.next(null);
      });
    }));

    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }
  ngOnDestroy(){
    this.manageCandidateSideBar=false;
    this.includeService.manageCandidateSideBarStatus=this.manageCandidateSideBar;
  }
  ngDoCheck(){
    this.candiadteformModal = new window.bootstrap.Modal(
      document.getElementById('candidateModal')
    );
  }

  openCandidateFormModal() {
    this.candiadteformModal.show();
  }

  saveCandidate() {
    this.candiadteformModal.hide();
  }

  getSpecificDrive(data:any)
  {
    this.driveTitle=data+" Hiring Drive Candidate List";
    this.specificDriveService.specificHiringDrive(data).subscribe((res)=>{
    this.specificDriveData = res;
    this.specificCandidateService.specificCandidateRecord=this.specificDriveData[0].entity;
    this.specificCandidateData=this.specificCandidateService.finalSpecificCandidate;
    console.log(Auth.currentSession().then((result)=>{
    this.tokenService.setToken(result.getIdToken().getJwtToken());
    this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
    this.getSpecificCandidate(this.specificDriveData[0].entity);
    })); 
  })
  }

  getSpecificCandidate(data:any){
    console.log(Auth.currentSession().then((result)=>{
      this.tokenService.setToken(result.getIdToken().getJwtToken());
      this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
      this.specificCandidateService.specificCandidate(data).subscribe((res)=>{
        this.specificCandidateData = res;
      })
    }));
    
  }

  postCandidateData(data:any)
  {
    console.warn("tttttt ",data);
    this.candidateService.saveCandidateData(data).subscribe((result)=>{
      console.warn("ppppp ",result);
    })
    // const currentRoute = this.router.url;
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //     this.router.navigate([currentRoute]);  
    // });
  }

  sampleData:any=[{
    'candidate_first_name':'shankar',
    'candidate_last_name':'gupta',
    'candidate_email':'sgupta@wg.com',
    'candidate_contact':'9010278388',
    'graduation_year':'2023',
    'entity':'CU'
  }]

  public importedData: Array<any> = [];

  public async importDataFromCSV(event: any) {
    let fileContent = await this.getTextFromFile(event);
    this.importedData = this.csvService.importDataFromCSV(fileContent);
  }

  private async getTextFromFile(event: any) {
    const file: File = event.target.files[0];
    let fileContent = await file.text();

    return fileContent;
  }


  public saveDataInCSV(name: string, data: Array<any>): void {
    let csvContent = this.csvService.saveDataInCSV(data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }

  public bulkUpload()
  {
    this.candidateService.saveCandidateData(this.importedData).subscribe((result)=>{
      console.warn("qqqq ",result);
      }) 
  }


}

