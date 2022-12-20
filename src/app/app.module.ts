import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule} from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideBarComponent } from './components/common/side-bar/side-bar.component';
import { HeaderComponent } from './components/common/header/header.component';
import { ContentComponent } from './components/home/content/content.component';
import { PanelFormComponent } from './components/drive-management/panel-form/panel-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PanelistFormComponent } from './components/panelist-form/panelist-form.component';
import { DriveManagementComponent } from './components/drive-management/drive-management.component';
import { RightContentComponent } from './components/home/content/right-content/right-content.component';
import { PanelistDataService } from './services/panelist-data.service';
import { HringDriveService } from './services/hring-drive.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HiringDriveFormComponent } from './components/drive-management/hiring-drive-form/hiring-drive-form.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { DataTablesModule } from "angular-datatables";

const routes: Routes = [
  {path: 'home', component:HomeComponent },
  {path: 'sign-in', component:SignInComponent},
  {path: 'panel-form', component:PanelFormComponent},
  {path:'panelist-form', component:PanelistFormComponent},
  {path:'entity-form', component:EntityFormComponent},
  {path:'drive-management', component:DriveManagementComponent},
  {path:'hiring-drive', component:HiringDriveFormComponent},
  {path:'**', component:SignInComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    DashboardComponent,
    SideBarComponent,
    HeaderComponent,
    ContentComponent,
    PanelFormComponent,
    PanelistFormComponent,
    DriveManagementComponent,
    RightContentComponent,
    HiringDriveFormComponent,
    EntityFormComponent
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(routes), NgbModule,HttpClientModule,DataTablesModule,CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
