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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
