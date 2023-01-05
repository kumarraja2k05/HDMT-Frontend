import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PanelistFormComponent } from './components/panelist-form/panelist-form.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PanelFormComponent } from './components/drive-management/panel-form/panel-form.component';
import { DriveManagementComponent } from './components/drive-management/drive-management.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { ViewDriveListComponent } from './components/drive-management/view-drive-list/view-drive-list.component';
import { HiringDriveFormComponent } from './components/drive-management/hiring-drive-form/hiring-drive-form.component';
import { HiringDriveInfoComponent } from './components/drive-management/hiring-drive-info/hiring-drive-info.component';
import { ManageCandidateComponent } from './components/drive-management/manage-candidate/manage-candidate.component';
import { ManagePanelistComponent } from './components/drive-management/manage-panelist/manage-panelist.component';
import { ViewPanelComponent } from './components/drive-management/panel-form/view-panel/view-panel.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [ 
    {path: 'sign-in', component:SignInComponent},
    {path: 'home', component:HomeComponent },
    {path:'panel-form', component:PanelFormComponent},
    {path:'panelist-form', component:PanelistFormComponent},
    {path:'drive-management', component:DriveManagementComponent},
    {path:'entity-form', component:EntityFormComponent},
    {path:'drive-list', component:ViewDriveListComponent},
    {path:'hiring-drive',component:HiringDriveFormComponent},
    {path: 'hiring-drive-info',component:HiringDriveInfoComponent},
    {path: 'manage-candidate',component:ManageCandidateComponent},
    {path: 'manage-panelist',component:ManagePanelistComponent},
    {path: 'view-panel',component:ViewPanelComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}