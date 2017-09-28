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
  likers: User[];
  error: String;
  
  private currentUser: User;

  constructor(private data: ApartmentDataService, private service: SessionDataService) { }

  get currentUserIsLister() {
    this.currentUser = this.service.getCurrentUser();
    return this.currentUser &&  this.selectedApartment && this.currentUser.id === this.selectedApartment.user_id;
  }

  get currentUserHasLiked() {
    let hasLiked = false;
    this.currentUser = this.service.getCurrentUser();
    if (this.likers && this.likers.length != 0) {
      for (let user of this.likers) {
        if (user.id === this.currentUser.id) {
          hasLiked = true;
        }
      }
    }
    console.log('hasLiked: ' + hasLiked);
    return hasLiked;
  }

  ngOnInit() {
    this.data
      .getMyListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Could not load user apartments data'
      );
  }

  selectApartment(apartment: Apartment) {
    this.selectedApartment = apartment;
    this.getApartmentLikers();
  }

  getApartmentLikers() {
    console.log('getAptLikers');
    this.data
      .getLikers(this.selectedApartment)
      .subscribe(
        users => this.likers = users,
        () => this.error = 'Could not find likers'
      );
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

  likeApartment() {
    this.data
      .likeApartment(this.selectedApartment)
      .subscribe(
        apartment => this.selectedApartment = apartment,
        () => this.error = 'Could not like apartment'
      );
  }

  nullifySelectedApartment() {
    this.selectedApartment = null;
    this.likers = null;
  }

}
