import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Offer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit, OnDestroy {


  offers!: Offer[];
  selectedOffer!: Offer;

  destroy$ = new Subject<boolean>();

  constructor(private offersService:OffersService) { 
    this.selectedOffer={
      title:'',
      description:''
    }
  }

  ngOnInit(): void {
   this.getContent();
  }
  ngOnDestroy():void{
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
  onPostSubmit(offer: Offer):void{
    const newOffer = {
      ...offer,
      id: this.offers!.length + 1
    }
     this.offersService.createOffer(newOffer).subscribe(()=>{
      this.getContent();
     }, (error)=>{
      console.log(error);
      
     });
  }

  onOfferSelect(offer:Offer): void{
    this.selectedOffer= offer;
    
  }

  private getContent(): void{
    this.offersService.getOffers().pipe(
      takeUntil(this.destroy$)
     ).subscribe((response:Offer[])=>{
      this.offers = response;
     },(error)=>{
      console.log(error);
     });
  }
}
