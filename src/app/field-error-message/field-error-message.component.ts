import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-error-message',
  templateUrl: './field-error-message.component.html',
  styleUrls: ['./field-error-message.component.css']
})
export class FieldErrorMessageComponent  {

  @Input() control!: FormControl;
  constructor() { }

 get errorMessage(): string {
  if(this.control.touched && this.control.invalid){
    if (this.control.errors!['required']) {
      return 'This field is required!'
    }
    
  }

  return '';
 }

}
