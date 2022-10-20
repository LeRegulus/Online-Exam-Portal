import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./pages/admin/dashboard/dashboard.component";
import {UserDashboardComponent} from "./pages/user/user-dashboard/user-dashboard.component";
import {TrainerDashboardComponent} from "./pages/trainer/trainer-dashboard/trainer-dashboard.component";
import {AdminGuard} from "./services/admin.guard";
import {UserGuard} from "./services/user.guard";
import {TrainerGuard} from "./services/trainer.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: DashboardComponent, canActivate : [AdminGuard],},
  {path: 'user', component: UserDashboardComponent, canActivate : [UserGuard],},
  {path: 'trainer', component: TrainerDashboardComponent, canActivate : [TrainerGuard],},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
