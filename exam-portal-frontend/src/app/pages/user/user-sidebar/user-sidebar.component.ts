import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories : any;

  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data : any) => {
          this.categories = data;
      },
      (error) => {
        Swal.fire('Error', 'Error in loading data.', 'error');
      }
    );
  }

}
