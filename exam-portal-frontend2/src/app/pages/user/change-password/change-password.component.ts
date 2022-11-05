import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {LoginService} from "../../../Services/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  id = 0;
  user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  }
  constructor(private userService : UserService, private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(
      (result : any) => {
        this.user = result;
        console.log(this.user);
      }
    );
  }

  public changePassword(){
    this.loginService.getCurrentUser().subscribe(
      (result : any) => {
        this.id = result.userId;
        console.log(this.user);
        this.userService.changePassword(this.id, this.user).subscribe(
          (data : any) => {
            console.log(data);
            this.loginService.getCurrentUser();
            Swal.fire('Success', 'Password changed successfully', 'success').then((e)=>{
              this.route.navigate(['/user/profile'])
            });
          },
          (error) => {
            Swal.fire('Error', 'Error in changing password', 'error');
            console.log(error)
          }
        );
      }
    );

  }

}
