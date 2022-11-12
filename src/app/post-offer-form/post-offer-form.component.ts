import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Offer } from '../offer.interface';
import { ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { OffersService } from '../offers.service';
import { Subject, take, takeUntil } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post-offer-form',
  templateUrl: './post-offer-form.component.html',
  styleUrls: ['./post-offer-form.component.css']
})
export class PostOfferFormComponent implements OnInit, OnChanges, OnDestroy {

  @Output() postSubmitted = new EventEmitter<Offer>()
   offer!: Offer;
  formGroup!: FormGroup ;

  destroy$ = new Subject<boolean>()


  constructor(private fb: FormBuilder, private offersService: OffersService,
    private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.offer={
      title: '',
      description: '',
      type: '',
      likes: 0,
      orgCreatedId: 0
    }
   }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: Params)=>{
      const id = params['id'];

      if (id) {
        this.getOffer(id)
      }
      this.buildForm()
    })
   
    
    this.offersService.getOffer(1).pipe(
      take(1)
    ).subscribe((response:Offer)=>{
      this.offer = response
    })
    
  }
  ngOnChanges(): void {
    if (this.formGroup) {
      this.formGroup.get('id')?.setValue(this.offer.id)
      this.formGroup.get('title')?.setValue(this.offer.title)
      this.formGroup.get('description')?.setValue(this.offer.description)
      this.formGroup.get('type')?.setValue(this.offer.type)
      this.formGroup.get('category')?.setValue(this.offer.category)

      
    }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  onSubmit(): void{
    
    const offer: Offer = {
      ...this.formGroup.value,

    }
    
    
    if (!offer.id) {
      this.offersService.createOffer({...offer}).pipe(
        take(1)
      ).subscribe(()=>{
        this.router.navigate(['/job-offers'])
      },(error)=>{
        console.log(error);
      })
      return;
    }
    this.offersService.updateOffer(offer ).pipe(
      takeUntil(this.destroy$)
    ).subscribe(()=>{
      this.router.navigate(['/job-offers'])
    }, (error)=> {
      console.log(error);
    })
   

  }
  buildForm(): void{
    const loggedOrg = this.authService.getLoggedOrg()
    this.formGroup= this.fb.group({
      id: this.offer.id,
      title:[this.offer.title,[Validators.required]],
      description:[this.offer.description,[Validators.required]],
      type: ['full-time',[Validators.required]],
      likes: 0,
      idUsersApplied: [{}],
      orgCreatedId: loggedOrg.id,
      category: ['office-administration', [Validators.required]]
    })
  }
  private getOffer(id:number): void{
    this.offersService.getOffer(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe((response:Offer)=>{
      this.offer = response

      this.buildForm()
    })
  }

}
