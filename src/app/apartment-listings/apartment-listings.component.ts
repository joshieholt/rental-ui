import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from '../apartment';
import { User } from '../user';
import { SessionDataService } from '../session-data/session-data.service';
import { UserDataService } from '../user-data/user-data.service';

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
  creator: User = new User();

  private currentUser: User;
  
  constructor(private aptData: ApartmentDataService, private service: SessionDataService, private userData: UserDataService) { }

  get currentUserIsLister() {
    return this.currentUser && this.selectedApartment && this.currentUser.id === this.selectedApartment.user_id;
  }

  get apartmentCreator(): User {
    console.log('in get apartmentCreator()');
    return this.creator;
  }

  get numberOfLikers() {
    if (this.likers === null || this.likers === undefined) {
      return 0;
    } else {
      return this.likers.length;
    }
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

  ngOnInit() {
    this.service
    .userChanged
    .subscribe(user => this.currentUser = user);

    this.aptData
      .apartmentChanged
      .subscribe(() => this.refreshApartments());
    this.refreshApartments();
  }

  private refreshApartments() {
    this.aptData
    .getActiveListings()
    .subscribe(
      apartments => this.apartments = apartments,
      () => this.error = 'Could not load apartment data'
    );
  }
}
