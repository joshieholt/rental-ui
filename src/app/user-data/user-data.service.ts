import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserDataService {

  baseUrl = 'http://localhost:4567/api/users';
  options = { withCredentials: true };

  constructor(private http: Http) { }

  getUser(id: number): Observable<User> {
    return this.http
      .get(`${this.baseUrl}/${id}`)
      .map(response => response.json());
  }
}
