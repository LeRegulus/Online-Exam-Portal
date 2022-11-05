import { Component, OnInit } from '@angular/core';
import {UserService} from "../../Services/user.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  handleRegister() {
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Registration success', 'Please check your mail to activate your account.', 'success');
        this.route.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Registration failed', 'User or email already exists use.', 'error');
        this.route.navigate(['/register']);
      }
    );
  }
}
