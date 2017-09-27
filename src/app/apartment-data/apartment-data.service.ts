import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Apartment } from '../apartment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import { User } from '../user';

@Injectable()
export class ApartmentDataService {

  options = { withCredentials: true };

  constructor(private http: Http) { }

  getActiveListings(): Observable<Apartment[]> {
    return this.http
      .get('http://localhost:4567/api/apartments')
      .map(response => response.json());
  }

  getMyListings(): Observable<Apartment[]> {
    return this.http
      .get('http://localhost:4567/api/apartments/mine', this.options)
      .map(response => response.json());
  }

}
