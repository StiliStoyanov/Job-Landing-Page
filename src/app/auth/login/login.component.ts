import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!:FormGroup 

  constructor(private fb: FormBuilder) {

   }

  ngOnInit(): void {
    this.buildForm()
  }
  onSubmit(): void{
    
  }


  private buildForm(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]

    })
  }
}
