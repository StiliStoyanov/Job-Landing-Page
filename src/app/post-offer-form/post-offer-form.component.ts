import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Offer } from '../offer.interface';
import { ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators }   from '@angular/forms';

@Component({
  selector: 'app-post-offer-form',
  templateUrl: './post-offer-form.component.html',
  styleUrls: ['./post-offer-form.component.css']
})
export class PostOfferFormComponent implements OnInit, OnChanges {

  @Output() postSubmitted = new EventEmitter<Offer>()
  @Input() offer!: Offer;
  formGroup!: FormGroup ;


  constructor(private fb: FormBuilder) {
 
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
    this.postSubmitted.emit(offer)
  }

}
