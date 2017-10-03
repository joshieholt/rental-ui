import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from '../apartment';
import { SessionDataService } from '../session-data/session-data.service';
import { User } from '../user';
import { UserDataService } from '../user-data/user-data.service';

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
  creator: User = new User();

  private currentUser: User;

  constructor(private aptData: ApartmentDataService, private service: SessionDataService, private userData: UserDataService) { }

  get currentUserIsLister() {
    return this.currentUser &&  this.selectedApartment && this.currentUser.id === this.selectedApartment.user_id;
  }

  get apartmentCreator(): User {
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
    .getMyListings()
    .subscribe(
      apartments => this.apartments = apartments,
      () => this.error = 'Could not load apartment data'
    );
  }

}
