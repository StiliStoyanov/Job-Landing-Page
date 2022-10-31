import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.css']
})
export class ProfileEditFormComponent implements OnInit {

  logged!: any
  formGroup!: FormGroup ;



  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.logged = this.authService.getLoggedUser()
    if (!this.logged) {
      this.logged = this.authService.getLoggedOrg()
    }
    this.buildForm()
  }


   buildForm(): void{
    this.formGroup= this.fb.group({
      username:[this.logged.username,[Validators.required]],
      password:[this.logged.password,[Validators.required]]
    })
  }
  onSubmit(): void{
    
    const current: any = {
     id : this.logged.id,
     username: this.formGroup.value.username,
     email: this.logged.email,
     password: this.formGroup.value.password,
     type: this.logged.type

    }
   
    if (this.logged.type=='user') {
      this.authService.updateUser(current).pipe(
        take(1)
      ).subscribe(()=>{
        this.router.navigate(['/profile'])
      },(error)=>{
        console.log(error);
      })
      this.authService.setLoggedUser(current)
    }
    else{
      this.authService.updateOrg(current).pipe(
        take(1)
      ).subscribe(()=>{
        this.router.navigate(['/profile'])
      },(error)=>{
        console.log(error);
      })
      this.authService.setLoggedOrg(current)
    }
  }
}
