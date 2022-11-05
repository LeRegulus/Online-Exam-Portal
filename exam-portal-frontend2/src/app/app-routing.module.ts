import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {DashboardComponent} from "./pages/admin/dashboard/dashboard.component";
import {ViewCategoriesComponent} from "./pages/admin/view-categories/view-categories.component";
import {AdminGuard} from "./Services/admin.guard";
import {AddCategoriesComponent} from "./pages/admin/add-categories/add-categories.component";
import {ViewQuizComponent} from "./pages/admin/view-quiz/view-quiz.component";
import {AddQuizComponent} from "./pages/admin/add-quiz/add-quiz.component";
import {ViewQuizQuestionsComponent} from "./pages/admin/view-quiz-questions/view-quiz-questions.component";
import {AddQuestionComponent} from "./pages/admin/add-question/add-question.component";
import {UpdateQuizComponent} from "./pages/admin/update-quiz/update-quiz.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import {UpdateUserComponent} from "./pages/admin/update-user/update-user.component";
import {UserDashboardComponent} from "./pages/user/user-dashboard/user-dashboard.component";
import {UserGuard} from "./Services/user.guard";
import {LoadQuizComponent} from "./pages/user/load-quiz/load-quiz.component";
import {InstructionComponent} from "./pages/user/instruction/instruction.component";
import {CategoriesComponent} from "./pages/user/categories/categories.component";
import {StartComponent} from "./pages/user/start/start.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {ServicesComponent} from "./pages/services/services.component";
import {ProfilComponent} from "./pages/profil/profil.component";
import {UpdateProfileComponent} from "./pages/user/update-profile/update-profile.component";
import {ChangePasswordComponent} from "./pages/user/change-password/change-password.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'services', component: ServicesComponent},
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate : [AdminGuard],
    children: [
      {
        path: 'profile',
        component: ProfilComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoriesComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'quiz/:qId',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qId/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-question/:qId/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'user/:qId',
        component: UpdateUserComponent,
      },
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate : [UserGuard],
    children : [
      {
        path: 'profile',
        component: ProfilComponent,
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: ':qId',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:qId',
        component: InstructionComponent,
      },
      {
        path: 'start/:qId',
        component: StartComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
