import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Offer } from '../offer.interface';
import { ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, NgForm, Validators }   from '@angular/forms';

@Component({
  selector: 'app-post-offer-form',
  templateUrl: './post-offer-form.component.html',
  styleUrls: ['./post-offer-form.component.css']
})
export class PostOfferFormComponent implements OnInit {

  @Output() postSubmitted = new EventEmitter<Offer>()
  formGroup!: FormGroup ;


  constructor(private fb: FormBuilder) {
 
   }

  ngOnInit(): void {
    this.formGroup= this.fb.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]]
    })
    
  }
  onSubmit(): void{
    console.log(this.formGroup);
    
    const offer: Offer = {
      ...this.formGroup.value,

    }
    this.postSubmitted.emit(offer)
  }

}
