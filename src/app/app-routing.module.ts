import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PanelistFormComponent } from './components/panelist-form/panelist-form.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PanelFormComponent } from './components/drive-management/panel-form/panel-form.component';
import { DriveManagementComponent } from './components/drive-management/drive-management.component';

const routes: Routes = [ 
    {path: 'sign-in', component:SignInComponent},
    {path: 'home', component:HomeComponent },
    {path:'panel-form', component:PanelFormComponent},
    {path:'panelist-form', component:PanelistFormComponent},
    {path:'drive-management', component:DriveManagementComponent}   
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}