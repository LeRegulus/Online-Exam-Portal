import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {LoginService} from "../../../Services/login.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  id = 0;
  user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  };
  constructor(private userService : UserService, private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
    this.loginService.getCurrentUser().subscribe(
      (result : any) => {
        this.user = result;
        console.log(this.user);
      }
    );
  }

  public UpdateUser(){
    this.loginService.getCurrentUser().subscribe(
      (result : any) => {
        this.id = result.userId;
        console.log(this.id);
        this.userService.updateUserById(this.id, this.user).subscribe(
          (data : any) => {
            console.log(data);
            this.loginService.getCurrentUser();
            Swal.fire('Success', 'User updated successfully', 'success').then((e)=>{
              this.route.navigate(['/user/profile'])
            });
          },
          (error) => {
            Swal.fire('Error', 'Error in updating user', 'error');
            console.log(error)
          }
        );
      }
    );

  }

}
