import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../session-data/session-data.service';
import { User } from '../user';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private currentUser: User;
  
  constructor(private service: SessionDataService) { }

  ngOnInit() {
    this.service
      .userChanged
      .subscribe(user => this.currentUser = user);
  }

  logout() {
    this.service
      .logout()
      .subscribe(user => this.currentUser = user);
  }

}
