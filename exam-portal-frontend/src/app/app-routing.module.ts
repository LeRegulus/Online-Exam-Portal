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
import {ProfileComponent} from "./pages/profile/profile.component";
import {WelcomeComponent} from "./pages/admin/welcome/welcome.component";
import {ViewCategoriesComponent} from "./pages/admin/view-categories/view-categories.component";
import {AddCategoriesComponent} from "./pages/admin/add-categories/add-categories.component";
import {ViewQuizComponent} from "./pages/admin/view-quiz/view-quiz.component";
import {AddQuizComponent} from "./pages/admin/add-quiz/add-quiz.component";
import {UpdateQuizComponent} from "./pages/admin/update-quiz/update-quiz.component";
import {ViewQuizQuestionsComponent} from "./pages/admin/view-quiz-questions/view-quiz-questions.component";
import {AddQuestionComponent} from "./pages/admin/add-question/add-question.component";
import {LoadQuizComponent} from "./pages/user/load-quiz/load-quiz.component";
import {InstructionsComponent} from "./pages/user/instructions/instructions.component";
import {StartComponent} from "./pages/user/start/start.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate : [AdminGuard],
    children : [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        component: WelcomeComponent,
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
    ]
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate : [UserGuard],
    children : [
      {
        path: ':qId',
        component: LoadQuizComponent,
      },
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'instructions/:qId',
        component: InstructionsComponent,
      },
    ],
  },
  {
    path: 'start/:qId',
    component: StartComponent,
    canActivate : [UserGuard],
  },
  {path: 'trainer', component: TrainerDashboardComponent, canActivate : [TrainerGuard],},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
