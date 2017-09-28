import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from '../apartment';
import { SessionDataService } from '../session-data/session-data.service';
import { User } from '../user';
import { UserDataService } from '../user-data/user-data.service';
import { Router } from '@angular/router';

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

  constructor(private aptData: ApartmentDataService, private service: SessionDataService, private userData: UserDataService, private router: Router) { }

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

    if (this.selectedApartment) {
      this.getApartmentLikers();
      this.getApartmentCreator();
    }

    this.aptData
      .getMyListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Could not load user apartments data'
      );
  }

  selectApartment(apartment: Apartment) {
    this.currentUser = this.service.getCurrentUser();
    this.selectedApartment = apartment;
    this.getApartmentLikers();
    this.getApartmentCreator();
  }

  getApartmentLikers() {
    console.log('getAptLikers');
    this.aptData
      .getLikers(this.selectedApartment)
      .subscribe(
        users => this.likers = users,
        () => this.error = 'Could not find likers'
      );
  }

  getApartmentCreator() {
    this.userData
      .getUser(this.selectedApartment.user_id)
      .subscribe(
        user => this.creator = user,
        () => this.error = 'Could not find creator'
      );
  }

  activateApartment() {
    this.aptData
      .activateApartment(this.selectedApartment)
      .subscribe(
        apartment => this.selectedApartment = apartment,
        () => this.error = 'Could not activate apartment'
      );
  }

  deactivateApartment() {
    this.aptData
      .deactivateApartment(this.selectedApartment)
      .subscribe(
        apartment => {
          this.selectedApartment = apartment;
          this.router.navigate(['/my-listings']);
        },
        () => this.error = 'Could not deactivate apartment'
      );
  }

  likeApartment() {
    this.aptData
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
