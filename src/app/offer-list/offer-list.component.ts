import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
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

  constructor(private offersService:OffersService, private authService: AuthService) { 
    this.selectedOffer={
      title:'',
      description:'',
      likes: 0,
      type: ''
      
    }
  }

  ngOnInit(): void {
   this.getContent();
  }
  ngOnDestroy():void{
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
 

  onOfferSelect(offer:Offer): void{
    this.selectedOffer= offer;
    
    this.offerId = offer.id
  }
  onOfferLike(offer:Offer): void{
    offer.likes+=1
    this.offersService.updateOffer(offer).pipe(
      take(1)
    ).subscribe(()=>{

    }, (error)=>{
      console.log(error);
    })
  }
  onApply(offer: Offer): void{
   
     const user = this.authService.getLoggedUser()
     if (!user.appliedFor?.includes(offer.id!)) {
       user.appliedFor?.push(offer.id!)
       offer.idUsersApplied?.push(user.id!)
       this.offersService.updateOffer(offer).pipe(
        takeUntil(this.destroy$)
      ).subscribe(()=>{
      }, (error)=>{
        console.log(error);
      })
     }
      
    this.authService.updateUser(user).pipe(
      take(1)
    ).subscribe(()=>{
      this.authService.setLoggedUser(user)
    }, (error)=>{
      console.log(error);
    })
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
