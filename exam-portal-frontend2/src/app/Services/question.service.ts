import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http : HttpClient) { }

  public getQuestionsOfQuiz(id : any){
    return this.http.get(`${baseUrl}/question/quiz/${id}`);
  }

  public getQuestionsOfQuizForTest(id : any){
    return this.http.get(`${baseUrl}/question/quiz/${id}`);
  }

  public addQuestion(question : any){
    return this.http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(id : any){
    return this.http.delete(`${baseUrl}/question/${id}`);
  }

  public evalQuiz(questions : any){
    return this.http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

  public sendResult(idUser :number, markGot:any, correctAnswers:any){
    return this.http.post(`${baseUrl}/question/send-result`, {idUser:idUser, markGot:markGot, correctAnswers:correctAnswers});
  }
}
