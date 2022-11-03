import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Offer } from '../offer.interface';

@Component({
  selector: 'app-offers-view',
  templateUrl: './offers-view.component.html',
  styleUrls: ['./offers-view.component.css']
})
export class OffersViewComponent  {

  offer?: Offer
  clickedLike!: boolean
  loggedUser!: User

  @Input() offers?: Offer[]
  @Output() offerSelected = new EventEmitter<Offer>()
  @Output() offerSelectedForApply = new EventEmitter<Offer>()
  @Output() offerDeleted = new EventEmitter<number>()
  constructor(private authService: AuthService) {
    this.loggedUser = this.authService.getLoggedUser()
   }
   onEdit(id: number):void {
    const offer = this.offers?.find(o=>o.id== id);
    this.offerSelected.emit(offer)        
   }

  onLike(event:any, id: any): void{
     this.offer = this.offers?.find(o=>o.id== id);
     this.offerSelected.emit(this.offer)  
       event.target.disabled = true;
  }
  onApply(id: any): void{
    const offer = this.offers?.find(o=>o.id== id);
    this.offerSelectedForApply.emit(offer)  
 }
  


  

 

}
