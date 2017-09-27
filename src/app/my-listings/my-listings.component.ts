import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from '../apartment';
import { SessionDataService } from '../session-data/session-data.service';
import { User } from '../user';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {

  selectedApartment: Apartment;
  apartments: Apartment[];
  error: String;
  
  private currentUser: User;

  constructor(private data: ApartmentDataService, private service: SessionDataService) { }

  ngOnInit() {
    this.data
      .getMyListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Count not load user apartments data'
        // apartments => this.error = 'No error',
        // e => this.error = 'Error ' + e
      );
  }

  selectApartment(apartment: Apartment) {
    this.selectedApartment = apartment;
  }

  nullifySelectedApartment() {
    this.selectedApartment = null;
  }

}
