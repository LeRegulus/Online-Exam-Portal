import { Component, OnInit } from '@angular/core';
import {LocationStrategy} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../../services/question.service";
import Swal from "sweetalert2";
import baseUrl from "../../../services/helper";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qId : any;
  questions : any;
  marksGot = 0;
  correctAnswers = 0;
  attemptes = 0;
  isSubmit = false;
  timer : any;

  constructor(private locationSt : LocationStrategy,
              private aRoute : ActivatedRoute,
              private questionService : QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this.aRoute.snapshot.params['qId'];
    this.loadQuestions();
  }
  preventBackButton(){
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  loadQuestions(){
    this.questionService.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data : any) => {
        this.questions = data;
        this.timer = this.questions.length*2*60;
        this.startTimer();
        console.log(this.questions);
      },
      (error) => {
        console.log(error)
        Swal.fire('Error', 'Error in loading data', 'error');
      }
    );
  }

  submitQuiz(){
    Swal.fire({
      title : 'Do you want tou submit this quiz?',
      showCancelButton : true,
      confirmButtonText : 'Submit',
      icon : "info"
    }).then((result) => {
      if (result.isConfirmed){
        // this.route.navigate(['/start/' + this.qId]);
        this.evalQuiz();
      }
    });
  }

  startTimer(){
    let t : any = window.setInterval(() => {
      if (this.timer <= 0){
        this.evalQuiz();
        clearInterval(t);
      }else {
        this.timer--;
      }
    }, 100);
  }

  getFormattedTimer(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-mm*60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this.questionService.evalQuiz(this.questions).subscribe(
      (data : any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.attemptes = data.attemptes;
        this.correctAnswers = data.correctAnswer;
        this.isSubmit = true;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.isSubmit = true;
    // this.questions.forEach((q: any) => {
    //   if (q.givenAnswer == q.answer){
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (q.givenAnswer.trim() != ''){
    //     this.attemptes++;
    //   }
    // });
    // console.log('Correct answers :' + this.correctAnswers);
    // console.log('Marks Got :' + this.marksGot);
  }

  printPage() {
    window.print();
  }
}
