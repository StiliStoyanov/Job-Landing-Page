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

  errorMessage!: string;
  appliedMessage!: string;


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
     if (!Object.keys(user.appliedFor!).map(Number).includes(offer.id!)) {
      this.appliedMessage = 'You have successfully applied for this job!'
      this.errorMessage = ''
      const id = offer.id!
       user.appliedFor![id] = "false"
       offer.idUsersApplied![user.id!] = "false"
       this.offersService.updateOffer(offer).pipe(
        takeUntil(this.destroy$)
      ).subscribe(()=>{
      }, (error)=>{
        console.log(error);
      })
     }
     else{
      this.appliedMessage = ''
      this.errorMessage = 'You have already applied for the job!'
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
