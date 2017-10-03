import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Apartment } from '../apartment';
import { User } from '../user';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { SessionDataService } from '../session-data/session-data.service';
import { UserDataService } from '../user-data/user-data.service';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  apartment: Apartment;
  currentUser: User;
  creator: User;
  likers: User[];
  error: string;
  id: number;
  basePath: string;

  constructor(private aptData: ApartmentDataService, private service: SessionDataService, private userData: UserDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.service.getCurrentUser();

    this.route.paramMap
      .subscribe(
        (params: ParamMap) => this.aptData
          .getApartmentById(Number.parseInt(params.get('id')))
          .subscribe(apartment => {
            this.apartment = apartment;
            this.getApartmentLikers();
            this.getApartmentCreator();
            if (this.currentUser === null) {
              window.localStorage.setItem('navPath', `/active/${Number.parseInt(params.get('id'))}`);
            } else {
              window.localStorage.setItem('navPath', '/mine');
            }
            
          })
      );

      this.basePath = window.location.pathname.replace(/\/\d+$/g, '');

    if (this.apartment) {
      this.getApartmentLikers();
      this.getApartmentCreator();
    }

  }

  getApartmentCreator() {
    this.userData
      .getUser(this.apartment.user_id)
      .subscribe(
        user => this.creator = user,
        () => this.error = 'Could not find creator'
      );
  }

  getApartmentLikers() {
    this.aptData
      .getLikers(this.apartment)
      .subscribe(
        users => this.likers = users,
        () => this.error = 'Could not find likers'
      );
  }

  likeApartment() {
    this.aptData
      .likeApartment(this.apartment)
      .subscribe(
        apartment => {
          this.apartment = apartment;
          this.getApartmentLikers();
        },
        () => this.error = 'Could not like apartment'
      );
  }

  activateApartment() {
    this.aptData
      .activateApartment(this.apartment)
      .subscribe(
        apartment => this.apartment = apartment,
        () => this.error = 'Could not activate apartment'
      );
  }

  deactivateApartment() {
    this.aptData
      .deactivateApartment(this.apartment)
      .subscribe(
        apartment => {
          this.apartment = apartment;
          // this.router.navigate(['/mine']);
        },
        () => this.error = 'Could not deactivate apartment'
      );}

  get currentUserIsLister() {
    return this.currentUser && this.apartment && this.currentUser.id === this.apartment.user_id;
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
    return hasLiked;
  }

  get numberOfLikers() {
    if (this.likers === null || this.likers === undefined) {
      return 0;
    } else {
      return this.likers.length;
    }
  }
}
