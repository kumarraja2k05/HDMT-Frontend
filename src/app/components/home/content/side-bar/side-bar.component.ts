import { Component } from '@angular/core';
import { Input} from '@angular/core';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  list=[
    {
      number:'1',
       name: 'Home',
       icon: 'fa-solid fa-house',
    },
    {
      number:'2',
       name: 'Profile',
       icon: 'fa-solid fa-user',
    },
    {
      number:'3',
       name: 'About',
       icon: 'fa-solid fa-house',
    },
    {
      number:'4',
       name: 'Contact',
       icon: 'fa-solid fa-address-card',
    },
    {
      number:'5',
       name: 'Help',
       icon: 'fa-sharp fa-solid fa-info',
    }
  ];

  // @Input()  sideNavStatus:boolean=false;
}
