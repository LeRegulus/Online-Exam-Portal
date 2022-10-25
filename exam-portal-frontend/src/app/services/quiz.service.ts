import { Injectable } from '@angular/core';
import baseUrl from "./helper";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http : HttpClient) { }

  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz : any){
    return this.http.post(`${baseUrl}/quiz/`, quiz);
  }
  public deleteQuiz(id : any){
    return this.http.delete(`${baseUrl}/quiz/${id}`);
  }
  public getQuizById(id : any){
    return this.http.get(`${baseUrl}/quiz/${id}`);
  }
  public updateQuizById(id : any, quiz: any){
    return this.http.put(`${baseUrl}/quiz/${id}`, quiz);
  }

  public getQuizzesOfCategory(cid : any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  public getActiveQuizzesOfCategory(cid : any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }

  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active/`);
  }
}
