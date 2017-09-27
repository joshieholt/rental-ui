import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from '../apartment';

@Component({
  selector: 'app-apartment-listings',
  templateUrl: './apartment-listings.component.html',
  styleUrls: ['./apartment-listings.component.css']
})
export class ApartmentListingsComponent implements OnInit {

  selectedApartment: Apartment;
  apartments: Apartment[];
  error: string;

  constructor(private data: ApartmentDataService) { }

  ngOnInit() {
    this.data
    .getActiveListings()
    .subscribe(
      apartments => this.apartments = apartments,
      () => this.error = 'Could not load apartment data'
    );
  }

  selectApartment(apartment: Apartment) {
    this.selectedApartment = apartment;
  }

  nullifySelectedApartment() {
    this.selectedApartment = null;
  }
}
