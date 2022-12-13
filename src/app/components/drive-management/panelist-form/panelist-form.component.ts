// import { Component, OnInit } from '@angular/core';



// declare var window:any;

// @Component({
//   selector: 'app-panelist-form',
//   templateUrl: './panelist-form.component.html',
//   styleUrls: ['./panelist-form.component.css']
// })
// export class PanelistFormComponent implements OnInit {
//   formModal: any;
//   ngOnInit(): void {
//     this.formModal = new window.bootstrap.Modal(
//       document.getElementById("exampleModalCenter")
//     );
//   }

//   openModal(){
//     this.formModal.show();
//   }

//   saveSomething(){
//     this.formModal.hide();
//   }
// }


import { Component } from '@angular/core';


declare var window: any;

@Component({
  selector: 'app-panelist-form',
  templateUrl: './panelist-form.component.html',
  styleUrls: ['./panelist-form.component.css']
})
export class PanelistFormComponent {
  formModal: any;
 
  constructor() {}
 
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }
  
  openFormModal() {
    this.formModal.show();
  }
  saveSomeThing() {
    // confirm or save something
    this.formModal.hide();
  }
}
