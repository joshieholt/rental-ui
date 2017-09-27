import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class SessionDataService {

  baseUrl = 'http://localhost:4567/api/sessions';
  options = { withCredentials: true };

  constructor(private http: Http) { }

  login(email: string, password: string): Observable<User> {
    const payload = { email, password };
    
    return this.http
      .post(this.baseUrl, payload, this.options)
      .map(response => response.json());
  }

}
