import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './pages/header/header.component';
import {FormsModule} from "@angular/forms";
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import {HttpClientModule} from "@angular/common/http";
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import {authInterceptorProviders} from "./Services/auth.interceptor";
import { AddCategoriesComponent } from './pages/admin/add-categories/add-categories.component';
import { ViewQuizComponent } from './pages/admin/view-quiz/view-quiz.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UpdateUserComponent } from './pages/admin/update-user/update-user.component';
import { AddUserComponent } from './pages/admin/add-user/add-user.component';
import { ReportComponent } from './pages/admin/report/report.component';
import {NgxPaginationModule} from "ngx-pagination";
import {PaginationModule} from "ngx-bootstrap/pagination";
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {InstructionComponent} from "./pages/user/instruction/instruction.component";
import { CategoriesComponent } from './pages/user/categories/categories.component';
import { ResultComponent } from './pages/user/result/result.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {DatePipe} from "@angular/common";
import { ProfilComponent } from './pages/profil/profil.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { UpdateProfileComponent } from './pages/user/update-profile/update-profile.component';
import { ChangePasswordComponent } from './pages/user/change-password/change-password.component';
import { AddCategoryComponent } from './pages/user/add-category/add-category.component';
import { AddQuizzComponent } from './pages/user/add-quizz/add-quizz.component';
import { AddQuuestionsComponent } from './pages/user/add-quuestions/add-quuestions.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    DashboardComponent,
    SidebarComponent,
    ViewCategoriesComponent,
    AddCategoriesComponent,
    ViewQuizComponent,
    AddQuizComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    UpdateQuizComponent,
    UsersComponent,
    UpdateUserComponent,
    AddUserComponent,
    ReportComponent,
    InstructionComponent,
    UserDashboardComponent,
    LoadQuizComponent,
    StartComponent,
    CategoriesComponent,
    ResultComponent,
    ProfilComponent,
    AboutComponent,
    ContactComponent,
    ServicesComponent,
    UpdateProfileComponent,
    ChangePasswordComponent,
    AddCategoryComponent,
    AddQuizzComponent,
    AddQuuestionsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        PaginationModule.forRoot(),
        BrowserAnimationsModule,
        MatProgressBarModule

    ],
  providers: [authInterceptorProviders, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
