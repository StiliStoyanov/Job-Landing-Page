import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Offer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-applied-view',
  templateUrl: './applied-view.component.html',
  styleUrls: ['./applied-view.component.css']
})
export class AppliedViewComponent implements OnInit {
  offers!: Offer[] 
  currentUser!: User
  constructor(private offerService: OffersService, private authService: AuthService) { }

  ngOnInit(): void {

    this.currentUser= this.authService.getLoggedUser()

    this.offerService.getOffers().pipe(
      take(1)
    ).subscribe((response)=>{
      this.offers = response.filter((offer)=> Object.keys(offer.idUsersApplied!).map(Number).includes(this.currentUser.id!))
      
    }, (error)=>{
      console.log(error);
      
    })
  }

}
