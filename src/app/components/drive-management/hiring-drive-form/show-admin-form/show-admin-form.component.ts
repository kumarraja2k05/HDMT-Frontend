import { Component } from '@angular/core';
import { PanelistDataService } from 'src/app/services/panelist-data.service';
import { Auth } from 'aws-amplify';
import { TokenServiceService } from 'src/app/services/token-service.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  checkArray!:any;
  result:any;
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
      })
    }));
    this.adminFormModal = new window.bootstrap.Modal(
      document.getElementById('adminModal')
    );
  }

  openAdminFormModal(){
    this.adminFormModal.show();
  }

  saveAdmin(){
    this.adminFormModal.hide();
  }
  getAdminData(){
    console.log('hello this is the form value',this.form.value);
    this.result = this.form.value.checkArray;
  }

  onCheckboxChange(e:any)
  {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if(e.target.checked)
    {
      checkArray.push(new FormControl(e.target.value));
    }
  }
}
