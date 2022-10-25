import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Offer } from '../offer.interface';
import { ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators }   from '@angular/forms';
import { OffersService } from '../offers.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-post-offer-form',
  templateUrl: './post-offer-form.component.html',
  styleUrls: ['./post-offer-form.component.css']
})
export class PostOfferFormComponent implements OnInit, OnChanges {

  @Output() postSubmitted = new EventEmitter<Offer>()
   offer!: Offer;
  formGroup!: FormGroup ;


  constructor(private fb: FormBuilder, private offersService: OffersService) {
    this.offer={
      title: '',
      description: ''
    }
   }

  ngOnInit(): void {
    this.formGroup= this.fb.group({
      title:[this.offer.title,[Validators.required]],
      description:[this.offer.description,[Validators.required]]
    })
    
  }
  ngOnChanges(): void {
    if (this.formGroup) {
      this.formGroup.get('title')?.setValue(this.offer.title)
      this.formGroup.get('description')?.setValue(this.offer.description)
    }

  }
  onSubmit(): void{
    
    const offer: Offer = {
      ...this.formGroup.value,

    }
    this.offersService.createOffer({...offer}).pipe(
      take(1)
    ).subscribe(()=>{
      console.log("success");
      
    },(error)=>{
      console.log(error);
    })

  }

}
