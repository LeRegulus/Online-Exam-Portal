import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {LoginService} from "../../Services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequest = {
    username:"",
    password:"",
  }

  constructor(private loginService : LoginService, private route : Router) { }

  ngOnInit(): void {
  }

  handleLogin(){
    this.loginService.login(this.authRequest).subscribe(
      (data : any) => {
        console.log("success");
        console.log(data.user);
        console.log(data.jwtToken);
        this.loginService.loginUser(data.jwtToken);
        this.loginService.setUser(data.user)
        // redirect ...ADMIN: admin-dashboard
        // redirect ...TRAINER: trainer-dashboard
        if (this.loginService.getUserRole() == "ADMIN"){
          this.route.navigate(['admin/profile'])
          this.loginService.loginStatusSubject.next(true);
        }else if (this.loginService.getUserRole() == "USER"){
          this.route.navigate(['user/profile'])
          this.loginService.loginStatusSubject.next(true);
        }else {
          this.loginService.logout();
        }
      },
      (error : any) => {
        Swal.fire('Error', 'Bad Credentials!!', 'error')
        console.log(error);
      }
    );
  }

}
