import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from '../apartment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrls: ['./create-apartment.component.css']
})
export class CreateApartmentComponent implements OnInit {

  newApartment: Apartment;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  number_of_bedrooms: number;
  number_of_bathrooms: number;
  square_footage: number;
  rent: number;
  error: string;

  constructor(private data: ApartmentDataService, private router: Router) { }

  ngOnInit() {
  }

  createApartment() {
    this.data
      .createApartment(this.address, this.city, this.state, this.zip_code, this.number_of_bedrooms, this.number_of_bathrooms, this.square_footage, this.rent)
      .subscribe(
        apartment => {
          this.newApartment = apartment;
          this.router.navigate(['/mine']);
        },
        () => this.error = 'Could not create apartment'
      );
  }

}
