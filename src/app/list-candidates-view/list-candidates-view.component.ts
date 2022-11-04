import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Offer } from '../offer.interface';
import { OffersService } from '../offers.service';

@Component({
  selector: 'app-list-candidates-view',
  templateUrl: './list-candidates-view.component.html',
  styleUrls: ['./list-candidates-view.component.css']
})
export class ListCandidatesViewComponent implements OnInit, OnDestroy {

  offer!: Offer;
  usersApplied!: User[]
  destroy$ = new Subject<boolean>()



  constructor(private activatedRoute: ActivatedRoute,
    private offerService: OffersService, private authService: AuthService) { }

  ngOnInit(): void {
  

    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params)=>{
      const id = params['id'];

      if (id) {
        this.offerService.getOffer(id).pipe(
          take(1)
        ).subscribe((response) => {
         this.offer = response
         this.authService.getUsers().pipe(
          take(1)
        ).subscribe((response) =>{
          
          this.usersApplied = response.filter((user)=>user.appliedFor!.includes(this.offer.id!))
          
        })
        }, (error) => {
          console.log(error);
        })
      }
    })
    
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
