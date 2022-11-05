import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../Services/category.service";
import Swal from "sweetalert2";
import {QuizService} from "../../Services/quiz.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories : any;
  quizzes : any;
  constructor(private categoryService : CategoryService,
              private quizService : QuizService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data!!', 'error');
      }
    );
    this.quizService.getActiveQuizzes().subscribe(
      (data : any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    );
  }

}
