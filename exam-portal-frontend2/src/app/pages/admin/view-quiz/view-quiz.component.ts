import { Component, OnInit } from '@angular/core';
import {QuizService} from "../../../Services/quiz.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent implements OnInit {

  quizzes : any = [];
  constructor(private quizService : QuizService, private route : Router) { }

  ngOnInit(): void {
    this.quizService.quizzes().subscribe(
      (data : any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data', 'error' )
      }
    )
  }

  deleteQuiz(id : any) {
    Swal.fire(
      {
        icon : "info",
        title : 'Are you sure, you want to delete this quiz??',
        confirmButtonText : 'Delete',
        showCancelButton : true,
      }
    ).then(
      (result) => {
        if (result.isConfirmed){
          this.quizService.deleteQuiz(id).subscribe(
            (data : any) => {
              this.quizzes = this.quizzes.filter((quiz:any) => quiz.qid != id)
              Swal.fire('Success', 'Quiz deleted', 'success');
            },
            (error) =>{
              Swal.fire('Error', 'Error in deleting quiz', 'error');
            },
          );
        }
      }
    )

  }

}
