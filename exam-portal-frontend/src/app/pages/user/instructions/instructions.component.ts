import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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
              private quizService : QuizService) { }

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

}
