import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../Services/quiz.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {CategoryService} from "../../../Services/category.service";

@Component({
  selector: 'app-add-quizz',
  templateUrl: './add-quizz.component.html',
  styleUrls: ['./add-quizz.component.css']
})
export class AddQuizzComponent implements OnInit {

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
  constructor(private categoryService : CategoryService, private quizService : QuizService, private route : Router) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
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
        Swal.fire('Success', 'Quiz is added successfully', 'success').then((e)=>{
          this.route.navigate(['/users/quizzes'])
        });
      },
      (error) => {
        Swal.fire('Error', 'Error while adding quiz', 'error');
        console.log(error)
      }
    )
  }

}
