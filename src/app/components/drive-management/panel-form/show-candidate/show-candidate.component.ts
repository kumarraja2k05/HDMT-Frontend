import { Component,OnInit,Input, Output,EventEmitter } from '@angular/core';
import { Auth } from 'aws-amplify';
import { SpecificCandidateService } from 'src/app/services/specific-candidate.service';
import { CandidateDataService } from 'src/app/services/candidate-data.service';
import { TokenServiceService } from 'src/app/services/token-service.service';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {HttpClient, HttpResponse} from '@angular/common/http';


declare var window: any;

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.css']
})
export class ShowCandidateComponent implements OnInit {

  @Input() specificCandidateData:any;
  candidateFormModal:any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  candidateArr:any=[];
  result:any=[];
  @Output() candidateData=new EventEmitter<any>();

  constructor(private specificCandidateService: SpecificCandidateService,private tokenService: TokenServiceService,private candidateService:CandidateDataService ){}
  
  ngOnInit(): void {
    this.dtTrigger.next(null);
    this.dtOptions={
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20]
    };
    this.candidateFormModal = new window.bootstrap.Modal(
      document.getElementById('candidateModal')
    );

  }
  // getSpecificCandidate(data:any){
  //   console.log(Auth.currentSession().then((result)=>{
  //     this.tokenService.setToken(result.getIdToken().getJwtToken());
  //     this.tokenService.setRefreshToken(result.getRefreshToken().getToken());
  //     this.specificCandidateService.specificCandidate(data).subscribe((res)=>{
  //       this.specificCandidateData = res;
  //     })
  //   }));
  // }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();;
  }

  openCandidateFormModal(){
    this.getCandidateData(this.specificCandidateData);
    this.candidateFormModal.show();
  }

  saveAdmin(){
    this.candidateFormModal.hide();
  }
  getCandidateData(candidate:any){
    console.log("rrrrr: ",candidate);
    this.candidateArr=[];
    for(let i in candidate){
      this.candidateArr.push({id: i, candidateFirstName: candidate[i].candidate_first_name, candidateLastName:candidate[i].candidate_last_name, isSelected: false});
    }
    console.log("ppppp ",this.candidateArr);
  }

  onCheckboxChange()
  {
    console.log(this.candidateArr);
  }

  getSelectedData(data:any){
    for(let i in this.candidateArr){
      if(this.candidateArr[i].isSelected===true){
        this.result.push(this.candidateArr[i].candidateFirstName+this.candidateArr[i].candidateLastName);
      }
    }
    console.log(this.result);
    this.sendCandidate(this.result);
  }
  sendCandidate(val: any) {
    this.candidateData.emit(val);
  }
}

class Admin{
  id!: number;
  candidateFirstName!: string;
  candidateLastName!: string;
  isSelected!: boolean;
}