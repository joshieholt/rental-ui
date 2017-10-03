import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserDataService } from '../user-data/user-data.service';
import { SessionDataService } from '../session-data/session-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  error: string;

  constructor(private data: UserDataService, private service: SessionDataService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    this.user = new User();
    this.user.email = this.email;
    this.user.password = this.password;
    this.user.first_name = this.first_name;
    this.user.last_name = this.last_name;
    this.data
      .createUser(this.user)
      .subscribe(
        user => {
          this.user = user;
          if (user) {
            this.submitLogin();
          } else {
            this.error = 'Could not sign up with that information';
          }
        },
        e => this.error = 'Not good, Goose! ' + e
      );
  }

  submitLogin() {
    console.log('email: ' + this.user.email + ', pw: ' + this.password);
    this.service
      .login(this.user.email, this.password)
      .subscribe(
        user => {
          if (user) {
            console.log('created and logged in new user');
            window.localStorage.setItem('navPath', '/mine');
            this.router.navigate(['/mine']);
          } else {
            console.log('created, but did not log in new user');
            this.error = 'Could not login with those credentials';
          }
        },
        e => this.error = 'Aw, crap! ' + e
      );
  }
}
