import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  hasLoggedInUser !:boolean
  hasLoggedInOrg !:boolean

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService,
      private router: Router) { 

  }

  ngOnInit(): void {
    this.authService.getHasLoggedInUser().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasLoggedUser =>this.hasLoggedInUser = hasLoggedUser)

    this.authService.getHasLoggedInOrg().pipe(
      takeUntil(this.destroy$)
    ).subscribe(hasLoggedOrg =>this.hasLoggedInOrg = hasLoggedOrg)
  
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout(): void{
    this.authService.logout();
    this.router.navigate(['login'])
  }
  
}
