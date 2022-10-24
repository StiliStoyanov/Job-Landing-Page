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
  offerId?: number

  destroy$ = new Subject<boolean>();

  constructor(private offersService:OffersService) { 
    this.selectedOffer={
      title:'',
      description:'',
      
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
    if (!this.offerId) {
      this.offersService.createOffer({...offer}).pipe(
        takeUntil(this.destroy$)
      ).subscribe(()=>{
        this.getContent();
      },(error)=>{
        console.log(error);
      })
      return; 
    }
    this.offersService.updateOffer(offer, this.offerId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(()=>{
      this.getContent()
    }, (error)=> {
      console.log(error);
    })
    this.offerId = undefined

   
  }

  onOfferSelect(offer:Offer): void{
    this.selectedOffer= offer;
    this.offerId = offer.id
  }
  onOfferDelete(offerId: number):void {
    this.offersService.deleteOffer(offerId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(()=>{
      this.getContent()
    },(error)=>{
      console.log(error);
      
    })
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
