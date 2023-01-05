import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HiringDriveFormComponent } from './components/drive-management/hiring-drive-form/hiring-drive-form.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { DataTablesModule } from "angular-datatables";
import { ViewDriveListComponent } from './components/drive-management/view-drive-list/view-drive-list.component';
import { ShowAdminFormComponent } from './components/drive-management/hiring-drive-form/show-admin-form/show-admin-form.component';
import { HiringDriveInfoComponent } from './components/drive-management/hiring-drive-info/hiring-drive-info.component';
import { ManageCandidateComponent } from './components/drive-management/manage-candidate/manage-candidate.component';
import { ManagePanelistComponent } from './components/drive-management/manage-panelist/manage-panelist.component';
import { ShowDrivePanelistComponent } from './components/drive-management/manage-panelist/show-drive-panelist/show-drive-panelist.component';
import { ShowCandidateComponent } from './components/drive-management/panel-form/show-candidate/show-candidate.component';
import { ShowPanelistComponent } from './components/drive-management/panel-form/show-panelist/show-panelist.component';
import { ShowCoordinatorsComponent } from './components/drive-management/panel-form/show-coordinators/show-coordinators.component';
import { ViewPanelComponent } from './components/drive-management/panel-form/view-panel/view-panel.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'home', component:HomeComponent,canActivate:[AuthGuard] },
  {path: 'sign-in', component:SignInComponent},
  {path: 'panel-form', component:PanelFormComponent,canActivate:[AuthGuard]},
  {path:'panelist-form', component:PanelistFormComponent,canActivate:[AuthGuard]},
  {path:'entity-form', component:EntityFormComponent,canActivate:[AuthGuard]},
  {path:'drive-management', component:DriveManagementComponent,canActivate:[AuthGuard]},
  {path:'drive-list', component:ViewDriveListComponent,canActivate:[AuthGuard]},
  {path:'hiring-drive',component:HiringDriveFormComponent,canActivate:[AuthGuard]},
  {path: 'hiring-drive-info',component:HiringDriveInfoComponent,canActivate:[AuthGuard]},
  {path: 'manage-candidate',component:ManageCandidateComponent,canActivate:[AuthGuard]},
  {path: 'manage-panelist',component:ManagePanelistComponent,canActivate:[AuthGuard]},
  {path: 'view-panel',component:ViewPanelComponent,canActivate:[AuthGuard]},
  {path:'**', component:SignInComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    SideBarComponent,
    HeaderComponent,
    ContentComponent,
    PanelFormComponent,
    PanelistFormComponent,
    DriveManagementComponent,
    RightContentComponent,
    HiringDriveFormComponent,
    EntityFormComponent,
    ViewDriveListComponent,
    ShowAdminFormComponent,
    HiringDriveInfoComponent,
    ManageCandidateComponent,
    ManagePanelistComponent,
    ShowDrivePanelistComponent,
    ShowCandidateComponent,
    ShowPanelistComponent,
    ShowCoordinatorsComponent,
    ViewPanelComponent
  ],
  imports: [
    ReactiveFormsModule,BrowserModule,FormsModule,RouterModule.forRoot(routes), NgbModule,HttpClientModule,DataTablesModule,CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
