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
  message: string;
  pathInfo: string;
  
  constructor(private data: SessionDataService, private router: Router) { }

  submitLogin() {
    this.data
    .login(this.email, this.password)
    .subscribe(
        user => {
          if (user) {
            // this.router.navigate(['/']);
            this.router.navigate(['/my-listings']);
          } else {
            this.message = 'Could not log in with those credentials';
          }
        },
      e => this.message = 'Ruh Roh! ' + e
    );
  }

  ngOnInit() {
  }

}
