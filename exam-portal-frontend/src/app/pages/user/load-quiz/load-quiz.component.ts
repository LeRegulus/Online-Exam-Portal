import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../services/quiz.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId : any ;
  quizzes  : any;
  constructor(private aRoute : ActivatedRoute,
              private  quizService : QuizService) { }

  ngOnInit(): void {
    this.catId = this.aRoute.snapshot.params['id'];
    if (this.catId == 0){
        this.quizService.quizzes().subscribe(
          (data : any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error in loading data', 'error');
          }
        );
    }else{

    }
  }

}
