import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../session-data/session-data.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  user: User;
  error: string;
  message: string;
  
  constructor(private data: SessionDataService) { }

  submitLogin() {
    this.data
    .login(this.email, this.password)
    .subscribe(
      // user => this.user = user,
      user => this.message = 'Hooray! your name is ' + user.first_name,
      e => this.message = 'Ruh Roh! ' + e
      // () => this.error = 'Could not load apartment data'
    );
  }

  ngOnInit() {
  }

}
