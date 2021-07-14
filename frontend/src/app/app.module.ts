import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { GuestComponent } from './guest/guest.component';
import { MaterialModule } from './material/material.module';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgentComponent } from './agent/agent.component';
import { RePageComponent } from './re-page/re-page.component';
import { ReCardComponent } from './re-card/re-card.component';
import { PromotedComponent } from './promoted/promoted.component';
import { UserdataComponent } from './userdata/userdata.component';
import { LogoutComponent } from './logout/logout.component';
import { NewReComponent } from './new-re/new-re.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ResForUserComponent } from './res-for-user/res-for-user.component';
import { UserModifyComponent } from './user-modify/user-modify.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { PromotedCardComponent } from './promoted-card/promoted-card.component';
import { AllReComponent } from './all-re/all-re.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    EmployeeComponent,
    UserComponent,
    GuestComponent,
    SearchComponent,
    HeaderComponent,
    AgentComponent,
    RePageComponent,
    ReCardComponent,
    PromotedComponent,
    UserdataComponent,
    LogoutComponent,
    NewReComponent,
    ProfileComponent,
    PasswordChangeComponent,
    ResForUserComponent,
    UserModifyComponent,
    PromotedCardComponent,
    AllReComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
