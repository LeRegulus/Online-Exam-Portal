import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helper";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http : HttpClient) { }

  public login(authRequest: any){
    return this.http.post(`${baseUrl}/api/login`, authRequest);
  }

  public loginUser(token:any){
    localStorage.setItem("token", token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == "" || tokenStr == null){
      return false;
    }else {
      return true;
    }
  }

  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  public getToken(){
    return localStorage.getItem("token");
  }

  public setUser(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr != null ){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.roles[0].roleName;
  }
}
