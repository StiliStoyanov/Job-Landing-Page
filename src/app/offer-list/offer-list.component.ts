import { Component, OnInit } from '@angular/core';
import { Offer } from '../offer.interface';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {


  offers?: Offer[];

  constructor() { }

  ngOnInit(): void {
    this.offers = [
      {
        id:1,
        title: 'IT job',
        description: 'Some description'
      },
      {
        id:2,
        title: 'HR position',
        description: 'Some description'
      },
      {
        id:3,
        title: 'Cleaner position',
        description: 'Some description'
      },
]
  }
  onPostSubmit(offer: Offer):void{
    const newOffer = {
      ...offer,
      id: this.offers!.length + 1
    }
     this.offers?.push(newOffer)
  }
}
