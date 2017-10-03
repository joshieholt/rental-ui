import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ApartmentListingsComponent } from './apartment-listings/apartment-listings.component';
import { ApartmentDataService } from './apartment-data/apartment-data.service';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { LoginComponent } from './login/login.component';
import { SessionDataService } from './session-data/session-data.service';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { CreateApartmentComponent } from './create-apartment/create-apartment.component';
import { UserDataService } from './user-data/user-data.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthenticationGuardGuard } from './authentication-guard.guard';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'active', 
    component: ApartmentListingsComponent,
    children: [
      { path: ':id', component: ApartmentDetailComponent }
    ]
  },
  {
    path: 'mine',
    component: MyListingsComponent,
    canActivate: [AuthenticationGuardGuard],
    children: [
      { path: 'new', component: CreateApartmentComponent },
      { path: ':id', component: ApartmentDetailComponent }
    ]
  },
  { path: '', redirectTo: '/active', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ApartmentListingsComponent,
    ApartmentDetailComponent,
    LoginComponent,
    MyListingsComponent,
    CreateApartmentComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApartmentDataService, SessionDataService, UserDataService, AuthenticationGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
