import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../Services/login.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: any;

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
  }

}
