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

  get currentUserIsLister() {
    return this.service.getCurrentUser() &&  this.selectedApartment && this.service.getCurrentUser().id === this.selectedApartment.user_id;
  }

  ngOnInit() {

    this.data
      .getMyListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Could not load user apartments data'
        // apartments => this.error = 'No error',
        // e => this.error = 'Error ' + e
      );
  }

  selectApartment(apartment: Apartment) {
    this.selectedApartment = apartment;
  }

  activateApartment() {
    this.data
      .activateApartment(this.selectedApartment)
      .subscribe(
        apartment => this.selectedApartment = apartment,
        () => this.error = 'Could not activate apartment'
      );
  }

  deactivateApartment() {
    this.data
      .deactivateApartment(this.selectedApartment)
      .subscribe(
        apartment => this.selectedApartment = apartment,
        () => this.error = 'Could not deactivate apartment'
      );
  }

  nullifySelectedApartment() {
    this.selectedApartment = null;
  }

}
