import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Offer } from '../offer.interface';

@Component({
  selector: 'app-offers-view',
  templateUrl: './offers-view.component.html',
  styleUrls: ['./offers-view.component.css']
})
export class OffersViewComponent  {

  @Input() offers?: Offer[]
  @Output() offerSelected = new EventEmitter<Offer>()
  @Output() offerDeleted = new EventEmitter<number>()
  constructor() {
   
   }
   onEdit(id: number):void {
    const offer = this.offers?.find(o=>o.id== id);
    this.offerSelected.emit(offer)        
   }

 

}
