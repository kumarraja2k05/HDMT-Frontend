import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule} from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'dashboard', component:DashboardComponent },
  {path: 'sign-in', component:SignInComponent},
  {path:'**', component:SignInComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
