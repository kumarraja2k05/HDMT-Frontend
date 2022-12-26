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
import { TokenRefreshService } from './services/token-refresh.service';
import { HiringDriveInfoComponent } from './components/drive-management/hiring-drive-info/hiring-drive-info.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent },
  {path: 'sign-in', component:SignInComponent},
  {path: 'panel-form', component:PanelFormComponent},
  {path:'panelist-form', component:PanelistFormComponent},
  {path:'entity-form', component:EntityFormComponent},
  {path:'drive-management', component:DriveManagementComponent},
  {path:'drive-list', component:ViewDriveListComponent},
  {path:'hiring-drive',component:HiringDriveFormComponent},
  {path: 'hiring-drive-info',component:HiringDriveInfoComponent},
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
    HiringDriveInfoComponent
  ],
  imports: [
    ReactiveFormsModule,BrowserModule,FormsModule,RouterModule.forRoot(routes), NgbModule,HttpClientModule,DataTablesModule,CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRefreshService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
