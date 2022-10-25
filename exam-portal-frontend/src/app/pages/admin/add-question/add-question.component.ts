import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../Question";
import {QuestionService} from "../../../services/question.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  id : any;
  title : any;
  question : any  = {
    questId: 0,
    content: '',
    image: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {},
  };
  constructor(private aRoute : ActivatedRoute, private questionService : QuestionService, private route : Router) { }

  ngOnInit(): void {
    this.id = this.aRoute.snapshot.params['qId'];
    this.title = this.aRoute.snapshot.params['title'];
    this.question.quiz['qid'] = this.id;

  }

  formSubmit(){
    if (this.question.content.trim() == '' || this.question.content == null ||
      this.question.option1.trim() == '' || this.question.option1 == null ||
      this.question.option2.trim() == '' || this.question.option2 == null ||
      this.question.option3.trim() == '' || this.question.option3 == null ||
      this.question.option4.trim() == '' || this.question.option4 == null
    ){
      Swal.fire('Error', 'All fields are required!!!', 'error');
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data : any) => {
        Swal.fire('Success', 'Question added successfully', 'success').then(
          (e) =>{
            this.route.navigate(['/admin/view-questions/'+ this.id +'/' + this.title])
          }
        );
      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
        console.log(error);
      }
    );
  }
}
