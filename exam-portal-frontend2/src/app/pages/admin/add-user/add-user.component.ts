import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  }

  constructor(private userService : UserService, private route : Router) { }

  ngOnInit(): void {
  }

  addUser() {
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Success', 'User added Successfully. his default password is 123456', 'success');
        this.route.navigate(['/admin/users']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in Adding user.', 'error');
        this.route.navigate(['/admin/users']);
      }
    );
  }

}
