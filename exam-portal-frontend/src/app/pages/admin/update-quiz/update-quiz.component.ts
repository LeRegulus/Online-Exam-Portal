import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import {CategoryService} from "../../../services/category.service";
import {Quiz} from "../../../Quiz";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  id = 0;
  quiz : Quiz = {
    qid : 0,
    title : '',
    description : '',
    maxMarks : 0,
    numberOfQuestions : 0,
    active : true,
    category : {
      cid : 0,
      title : '',
      description : '',
    },
  };
  categories : any = [];

  constructor(private route : Router, private aRoute : ActivatedRoute, private quizService : QuizService, private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params['qId'];
    this.quizService.getQuizById(this.id).subscribe(
      (data : any) => {
        this.quiz = data;
        console.log(this.quiz)
      },
    (error) => {
        console.log(error);
    },
    );
    console.log(this.quiz);
    this.categoryService.categories().subscribe(
      (data : any) =>{
        this.categories = data;
      },
      (error) => {
        alert("Error in loading categories")
      }
    );

  }

  public updateQuiz(){
    this.id = this.aRoute.snapshot.params['qId'];
    this.quizService.updateQuizById(this.id, this.quiz).subscribe(
      (data : any) => {
        Swal.fire('Success', 'Quiz updated successfully', 'success').then((e)=>{
          this.route.navigate(['/admin/quizzes'])
        });
      },
      (error) => {
        Swal.fire('Error', 'Error in updating quiz', 'error');
        console.log(error)
      }
    )
  }

}
