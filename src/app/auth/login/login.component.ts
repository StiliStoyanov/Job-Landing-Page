import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage!: string;
  formGroup!:FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router : Router) {

   }

  ngOnInit(): void {
    this.buildForm()
  }
  onSubmit(): void{

    this.errorMessage = '';

    const username = this.formGroup.value.username
    const password = this.formGroup.value.password
    
    const type = this.formGroup.value.type
  
    if (type==="user") {
      this.authService.loginUser(username, password).pipe(
        take(1)
      ).subscribe(response => {
        if (!response) {
          this.errorMessage = 'Invalid username or password'
          return;
        }
  
        this.authService.setLoggedUser(response)
        this.router.navigate(['job-offers'])
      })
    }
    else{
      this.authService.loginOrg(username, password).pipe(
        take(1)
      ).subscribe(response => {
        if (!response) {
          this.errorMessage = 'Invalid username or password'
          return;
        }
  
        this.authService.setLoggedOrg(response)
        this.router.navigate(['job-offers'])
      })
    }
    
    
    

   
    
    
    
  }


  private buildForm(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['user', Validators.required]
    })
  }
}
