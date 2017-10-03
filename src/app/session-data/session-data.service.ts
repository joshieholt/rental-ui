import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/do';

@Injectable()
export class SessionDataService {

  baseUrl = 'http://localhost:4567/api/sessions';
  options = { withCredentials: true };

  userChanged: Subject<User>;
  private currentUser: User;

  constructor(private http: Http) {
    this.userChanged = new Subject<User>();

    this.currentUser = JSON.parse(window.localStorage.getItem('currentUser') || 'null');
    this.userChanged.next(this.currentUser);
  }

  login(email: string, password: string): Observable<User> {
    const payload = { email, password };
    
    return this.http
      .post(this.baseUrl, payload, this.options)
      .map(response => response.status === 201 ? response.json() : null)
      .do(user => this.userChanged.next(user))
      .do(user => this.setCurrentUser(user));
  }

  logout(): Observable<User> {
    return this.http
      .delete(`${this.baseUrl}/mine`, this.options)
      .map(response => null)
      .do(user => this.userChanged.next(user))
      .do(user => this.setCurrentUser(user));
  }

  getCurrentUser(): User {
    console.log('ses.currUser: ' + this.currentUser);
    return this.currentUser;
  }

  private setCurrentUser(user: User) {
    this.currentUser = user;
    window.localStorage.setItem('currentUser', JSON.stringify(user));
  }

}
