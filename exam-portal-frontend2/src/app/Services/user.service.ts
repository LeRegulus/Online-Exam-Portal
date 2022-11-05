import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http : HttpClient) { }

  public addUser(user : any){
    return this.http.post(`${baseUrl}/register`, user);
  }

  public getUsers(){
    return this.http.get(`${baseUrl}/users/`);
  }
  public adUser(user : any){
    return this.http.post(`${baseUrl}/users/`, user);
  }
  public deleteUser(id : any){
    return this.http.delete(`${baseUrl}/users/${id}`);
  }
  public getUserById(id : any){
    return this.http.get(`${baseUrl}/users/${id}`);
  }
  public updateUserById(id : any, user: any){
    return this.http.put(`${baseUrl}/users/${id}`, user);
  }
  public changePassword(id : any, user: any){
    return this.http.put(`${baseUrl}/users/${id}`, user);
  }
}
