import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../session-data/session-data.service';
import { User } from '../user';
import { Router } from '@angular/router';

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
  pathInfo: string;
  currentUser: User;
  returnUrl: string;

  constructor(private data: SessionDataService, private router: Router) { }

  submitLogin() {
    let navPath = window.localStorage.getItem('navPath') || '/mine';
    this.data
    .login(this.email, this.password)
    .subscribe(
        user => {
          if (user) {
            this.currentUser = user;
            window.localStorage.setItem('navPath', '/mine');
            this.router.navigate([navPath]);
          } else {
            this.error = 'Could not log in with those credentials';
          }
        },
      e => this.error = 'Ruh Roh! ' + e
    );
  }

  ngOnInit() {
  }

}
