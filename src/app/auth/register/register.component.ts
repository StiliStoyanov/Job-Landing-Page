import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMessage !: string
  formGroup!: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
     private router: Router) {

   }

  ngOnInit(): void {
    this.buildForm()
  }

  onSubmit(): void{
    const formValue = this.formGroup.value

    if (formValue.password !== formValue.rePassword) {
      this.errorMessage = 'Passwords dont match!'
      this.formGroup.reset({
        username: formValue.username,
        email: formValue.email,
        password: '',
        rePassword: ''
      })
      return;
    }
    
    if (formValue.type ==='user') {
      this.authService.getUsers().pipe(
        map((stream: User[])=>stream.find(user => user.username === formValue.username)),
        take(1)
      ).subscribe(response =>{
        if (response) {
          this.errorMessage ='Username has already been taken'
          return;
        }
        
        this.authService.registerUser(formValue).pipe(
          take(1)
        ).subscribe( () => {
          this.router.navigate(['login'])
        })
      })
    }
    else{
      this.authService.getOrg().pipe(
        map((stream: User[])=>stream.find(user => user.username === formValue.username)),
        take(1)
      ).subscribe(response =>{
        if (response) {
          this.errorMessage ='Username has already been taken'
          return;
        }
        
        this.authService.registerOrg(formValue).pipe(
          take(1)
        ).subscribe( () => {
          this.router.navigate(['login'])
        })
      })
    }

   
  }

  private buildForm(): void{
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, Validators.minLength(5)]],
      type: ['user', Validators.required],
      appliedFor: [[]]
    })
 
    
  }

}
