import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from '../apartment';
import { User } from '../user';
import { SessionDataService } from '../session-data/session-data.service';

@Component({
  selector: 'app-apartment-listings',
  templateUrl: './apartment-listings.component.html',
  styleUrls: ['./apartment-listings.component.css']
})
export class ApartmentListingsComponent implements OnInit {

  selectedApartment: Apartment;
  apartments: Apartment[];
  likers: User[];
  error: string;

  private currentUser: User;

  constructor(private data: ApartmentDataService, private service: SessionDataService) { }

  get currentUserIsLister() {
    // this.currentUser = this.service.getCurrentUser();
    return this.currentUser && this.selectedApartment && this.currentUser.id === this.selectedApartment.user_id;
  }

  get currentUserHasLiked() {
    let hasLiked = false;
    // this.currentUser = this.service.getCurrentUser();
    if (this.likers && this.likers.length != 0) {
      for (let user of this.likers) {
        if (user.id === this.currentUser.id) {
          hasLiked = true;
        }
      }
    }
    return hasLiked;
  }

  get numberOfLikers() {
    return this.likers.length;
  }
  
  ngOnInit() {
    this.service
    .userChanged
    .subscribe(user => this.currentUser = user);

    if (this.selectedApartment) { this.getApartmentLikers(); }

    this.data
    .getActiveListings()
    .subscribe(
      apartments => this.apartments = apartments,
      () => this.error = 'Could not load apartment data'
    );
  }

  selectApartment(apartment: Apartment) {
    console.log('in selectApartment');
    this.currentUser = this.service.getCurrentUser();
    this.selectedApartment = apartment;
    this.getApartmentLikers();
    console.log('currentUser: ' + this.currentUser.id);
    console.log('selectedApt: ' + this.selectedApartment.id + ', ' + this.selectedApartment.user_id);
  }

  getApartmentLikers() {
    this.data
      .getLikers(this.selectedApartment)
      .subscribe(
        users => this.likers = users,
        () => this.error = 'Could not find likers'
      );
  }

  likeApartment() {
    console.log('likeApt.selectedApt: ' + this.selectedApartment);
    this.data
      .likeApartment(this.selectedApartment)
      .subscribe(
        apartment => {
          this.selectedApartment = apartment;
          this.getApartmentLikers();
        },
        () => this.error = 'Could not like apartment'
      );
  }

  nullifySelectedApartment() {
    this.selectedApartment = null;
    this.likers = null;
  }
}
