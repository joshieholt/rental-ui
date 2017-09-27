import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Apartment } from '../apartment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ApartmentDataService {

  constructor(private http: Http) { }

  getActiveListings(): Observable<Apartment[]> {
    return this.http
      .get('http://localhost:4567/api/apartments')
      .map(response => response.json());
  }

}
