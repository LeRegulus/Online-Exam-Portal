import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import Swal from  'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserService, private  route : Router) { }

  public user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  }

  ngOnInit(): void {
  }

  handleRegister() {
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Registration success', 'Please chek your mail to activate your account.', 'success');
        this.route.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        Swal.fire('Registration failed', 'Something went wrong.', 'error');
        this.route.navigate(['/register']);
      }
    )
  }

}
