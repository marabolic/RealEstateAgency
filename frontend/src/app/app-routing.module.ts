import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { AllReComponent } from './all-re/all-re.component';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NewReComponent } from './new-re/new-re.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ProfileComponent } from './profile/profile.component';
import { PromotedComponent } from './promoted/promoted.component';
import { RePageComponent } from './re-page/re-page.component';
import { RegisterComponent } from './register/register.component';
import { ResForUserComponent } from './res-for-user/res-for-user.component';
import { UserModifyComponent } from './user-modify/user-modify.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path: "", component: GuestComponent},
  {path: "register", component: RegisterComponent},
  {path: "login", component: LoginComponent},
  {path: "logout", component: LogoutComponent},
  {path: "re_page", component: RePageComponent},
  {path: "profile", component: ProfileComponent},
  {path: "profile/passChange", component: PasswordChangeComponent},
  {path: "new-re", component: NewReComponent},
  {path: "user-modify", component: UserModifyComponent},
  {path: "my-real-estates", component: ResForUserComponent},
  {path: "all-re", component: AllReComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
