import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule} from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideBarComponent } from './components/home/content/side-bar/side-bar.component';
import { HeaderComponent } from './components/home/header/header.component';
import { ContentComponent } from './components/home/content/content.component';
import { PanelFormComponent } from './panel-form/panel-form.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent },
  {path: 'sign-in', component:SignInComponent},
  {path: 'panel-form', component:PanelFormComponent},
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
    PanelFormComponent
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
