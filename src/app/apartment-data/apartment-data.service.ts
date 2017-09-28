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

  getLikers(apartment: Apartment): Observable<User[]> {
    return this.http
      .get(`http://localhost:4567/api/apartments/${apartment.id}/get-likers`, this.options)
      .map(response => response.json());
  }

  createApartment(address: string, city: string, state: string, zip_code: string, number_of_bedrooms: number, number_of_bathrooms: number, square_footage: number, rent: number): Observable<Apartment> {
    const payload = { address, city, state, zip_code, number_of_bedrooms, number_of_bathrooms, square_footage, rent };
    return this.http
      .post('http://localhost:4567/api/apartments', payload, this.options)
      .map(response => response.json());
  }

  activateApartment(apartment: Apartment): Observable<Apartment> {
    return this.http
      .post(`http://localhost:4567/api/apartments/${apartment.id}/activations`, {}, this.options)
      .map(response => response.json());
  }

  deactivateApartment(apartment: Apartment): Observable<Apartment> {
    return this.http
      .post(`http://localhost:4567/api/apartments/${apartment.id}/deactivations`, {}, this.options)
      .map(response => response.json());
  }

  likeApartment(apartment: Apartment): Observable<Apartment> {
    return this.http
      .post(`http://localhost:4567/api/apartments/${apartment.id}/like`, {}, this.options)
      .map(response => response.json());
  }
}
