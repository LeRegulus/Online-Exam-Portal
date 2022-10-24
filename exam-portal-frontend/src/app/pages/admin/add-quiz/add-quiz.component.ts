import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import Swal from "sweetalert2";
import {QuizService} from "../../../services/quiz.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories : any = [];
  quizData  = {
    title : '',
    description : '',
    maxMarks : 0,
    numberOfQuestions : 0,
    active : true,
    category : {
      cid : ''
    },
  };
  constructor(private CategoryService : CategoryService, private quizService : QuizService, private route : Router) { }

  ngOnInit(): void {
    this.CategoryService.categories().subscribe(
      (data : any) => {
        this.categories = data;
        console.log(this.categories);
      },
    (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error');
    }
    )
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null ||
      this.quizData.description.trim() == '' || this.quizData.description == null ||
      this.quizData.maxMarks == 0 || this.quizData.maxMarks == null ||
      this.quizData.numberOfQuestions == 0 || this.quizData.numberOfQuestions == null
    ){
      Swal.fire('Error', 'All fields are required!!!', 'error');
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'Quiz.ts is added successfully', 'success').then((e)=>{
          this.route.navigate(['/admin/quizzes'])
        });
      },
      (error) => {
        Swal.fire('Error', 'Error while adding quiz', 'error');
        console.log(error)
      }
    )
  }
}
