import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category = {
    "title" : "",
    "description" : "",
  };

  constructor(private categoryService : CategoryService, private route : Router) { }

  ngOnInit(): void {
  }

  formSubmit(){

    if (this.category.title.trim() == '' || this.category.title == null ||
      this.category.description.trim() == '' || this.category.description == null
    ){
      Swal.fire('Error', 'All fields are required!!.', 'error');
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (data : any) =>{
        Swal.fire('Success', 'Category is added!!', 'success');
        this.route.navigate(["/admin/categories"])
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Server error.', 'error');
      }
    );

  }

}
