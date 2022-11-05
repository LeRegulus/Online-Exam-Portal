import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../Services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : any;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data : any) => {
        this.users = data;
        console.log(this.users);
      },
    (error) =>{
        Swal.fire('Error', 'Error in loading data');
        console.log(error);
      }
    );
  }

  deleteUser(id : any) {
    Swal.fire(
      {
        icon : "info",
        title : 'Are you sure, you want to delete this user??',
        confirmButtonText : 'Delete',
        showCancelButton : true,
      }
    ).then(
      (result) => {
        if (result.isConfirmed){
          this.userService.deleteUser(id).subscribe(
            (data : any) => {
              this.users = this.users.filter((user:any) => user.qid != id)
              Swal.fire('Success', 'User deleted', 'success');
            },
            (error) =>{
              Swal.fire('Error', 'Error in deleting user', 'error');
            },
          );
        }
      }
    )

  }

}
