import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RegisterComponent } from './components/register/register.component';
import {authInterceptorProviders} from "./services/auth.interceptor";
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { TrainerDashboardComponent } from './pages/trainer/trainer-dashboard/trainer-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from "@angular/material/card";
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import {MatIconModule} from "@angular/material/icon";
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import {MatTableModule} from "@angular/material/table";
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UserSidebarComponent } from './pages/user/user-sidebar/user-sidebar.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { StartComponent } from './pages/user/start/start.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxUiLoaderHttpModule, NgxUiLoaderModule} from "ngx-ui-loader";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    UserDashboardComponent,
    TrainerDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategoriesComponent,
    AddCategoriesComponent,
    ViewQuizComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    UserSidebarComponent,
    LoadQuizComponent,
    InstructionsComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground : true,
    }),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
