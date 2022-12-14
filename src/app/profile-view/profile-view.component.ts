import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit, OnDestroy {
    imageSrcUser = 'assets/images/user.jpg'  
    imageSrcOrg = 'assets/images/org.png'  

    destroy$ = new Subject<boolean>();
    logged!: any

  constructor( private authService: AuthService,
    private router: Router, private offerService: OffersService) { }

  ngOnInit(): void {
    this.logged = this.authService.getLoggedUser()
    if (!this.logged) {
      this.logged = this.authService.getLoggedOrg()
    }
    
  }
  ngOnDestroy():void{
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
  onDelete():void{
    if (this.logged.type== 'user') {
      this.authService.deleteUser(this.logged.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe(()=>{
       this.authService.logout()
      this.router.navigate(['login'])
      },(error)=>{
        console.log(error);
      })
    }
    else{
      this.authService.deleteOrg(this.logged.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe(()=>{
        this.offerService.getOffers().pipe(
          take(1)
        ).subscribe((response)=>{
          const offersFromLoggedOrg = response.filter((offer)=>offer.orgCreatedId == this.logged.id)
          offersFromLoggedOrg.forEach((offer)=>{
            this.offerService.deleteOffer(offer.id!).pipe(
              take(1)
            ).subscribe(()=>{
            })
          })
        },(error)=>{
          console.log(error);
          
        })
       this.authService.logout()
      this.router.navigate(['login'])
      },(error)=>{
        console.log(error);
      })
    }
  }
 

}
