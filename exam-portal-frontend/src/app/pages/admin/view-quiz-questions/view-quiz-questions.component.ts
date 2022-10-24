import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../../services/question.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  id: any ;
  title : any;
  questions : any = [];

  constructor(private aRoute : ActivatedRoute,
              private questionService : QuestionService,
              private route : Router) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params['id'];
    this.title = this.aRoute.snapshot.params['title'];
    this.questionService.getQuestionsOfQuiz(this.id).subscribe(
      (data : any) => {
        this.questions = data;
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteQuestion(questId: any) {
    this.questionService.deleteQuestion(questId);
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
          this.questionService.deleteQuestion(questId).subscribe(
            (data : any) => {
              Swal.fire('Success', 'Question deleted', 'success');
              this.questions = this.questions.filter((question : any) => question.questId != questId);
            },
            (error) =>{
              Swal.fire('Error', 'Error in deleting question', 'error');
            },
          );
        }
      }
    )
  }
}
