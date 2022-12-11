import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule} from '@angular/forms';
import { Routes,RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'home', component:HomeComponent },
  {path: 'sign-in', component:SignInComponent},
  {path:'**', component:SignInComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
