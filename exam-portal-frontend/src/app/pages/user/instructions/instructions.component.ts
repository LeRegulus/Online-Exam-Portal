import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId : any ;
  quiz : any;

  constructor(private aRoute : ActivatedRoute,
              private quizService : QuizService, private route : Router) { }

  ngOnInit(): void {
    this.qId = this.aRoute.snapshot.params['qId'];
    this.quizService.getQuizById(this.qId).subscribe(
      (data : any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error)
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    )
  }

  StartQuiz() {
    Swal.fire({
      title : 'Do you want tou start the quiz?',
      showCancelButton : true,
      confirmButtonText : 'Start',
      icon : "info"
    }).then((result) => {
      if (result.isConfirmed){
        this.route.navigate(['/start/' + this.qId]);
      }else if (result.isDenied){
        Swal.fire('Change are not saved', '', 'info');
      }
    });

  }
}
