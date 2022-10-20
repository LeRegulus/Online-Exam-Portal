import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import Swal from  'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequest = {
    username:"",
    password:""
  }

  constructor(private  route : Router, private loginService : LoginService) { }

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
        //redirect ...ADMIN: admin-dashboard
        //redirect ...TRAINER: trainer-dashboard
        if (this.loginService.getUserRole() == "ADMIN"){
          this.route.navigate(['admin'])
          this.loginService.loginStatusSubject.next(true);
        }else if (this.loginService.getUserRole() == "TRAINER"){
          this.route.navigate(['trainer'])
          this.loginService.loginStatusSubject.next(true);
        }else if (this.loginService.getUserRole() == "USER"){
          this.route.navigate(['user'])
          this.loginService.loginStatusSubject.next(true);
        }else {
          this.loginService.logout();
        }
      },
      (error : any) => {
        Swal.fire('Error', 'Bad Credentials!!', 'error')
      }
    );
  }

}
