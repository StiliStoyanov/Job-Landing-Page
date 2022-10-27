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
    
    

    this.authService.login(username, password).pipe(
      take(1)
    ).subscribe(response => {
      if (!response) {
        this.errorMessage = 'Invalid username or password'
        return;
      }
      this.router.navigate(['job-offers'])
    })
    
    
    
  }


  private buildForm(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]

    })
  }
}
