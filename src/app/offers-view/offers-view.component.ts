import { Component, OnInit, Input } from '@angular/core';
import { Offer } from '../offer.interface';

@Component({
  selector: 'app-offers-view',
  templateUrl: './offers-view.component.html',
  styleUrls: ['./offers-view.component.css']
})
export class OffersViewComponent  {

  @Input() offers?: Offer[]
  constructor() {
   
   }

 

}
