import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {LoginService} from "../../../Services/login.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  id = 0;
  user : any = {
    id: 0,
    firstName : '',
    lastName : '',
    username : '',
    email : '',
    phone : 0,
    password : '',
  };
  constructor(private userService : UserService, private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
   this.loginService.getCurrentUser().subscribe(
     (result : any) => {
       this.id = result.id
       console.log(this.id);
     }
   );
  }

  public UpdateUser(){
    this.loginService.getCurrentUser().subscribe(
      (result : any) => {
        this.id = result.id
        console.log(this.id);
      }
    );
    this.userService.updateUserById(this.id, this.user).subscribe(
      (data : any) => {
        Swal.fire('Success', 'User updated successfully', 'success').then((e)=>{
          this.route.navigate(['/admin/users'])
        });
      },
      (error) => {
        Swal.fire('Error', 'Error in updating user', 'error');
        console.log(error)
      }
    )
  }

}
