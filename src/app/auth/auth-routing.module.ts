import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {SignInComponent} from "./signin/sign-in.component";
import {SignOutComponent} from "./signout/sign-out.component";

const routes: Routes = [
  { path: 'signout', component: SignOutComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
