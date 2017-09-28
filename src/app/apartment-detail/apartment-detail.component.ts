import { Component, OnInit, Input } from '@angular/core';
import { Apartment } from '../apartment';
import { User } from '../user';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  @Input()
  apartment: Apartment;

  @Input()
  creator: User;

  @Input()
  numberOfLikers: number;
  
  constructor() { }

  ngOnInit() {
  }

}
