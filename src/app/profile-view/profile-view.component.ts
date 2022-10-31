import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
    imageSrcUser = 'assets/images/user.jpg'  
    imageSrcOrg = 'assets/images/org.png'  

    logged!: any

  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.logged = this.authService.getLoggedUser()
    if (!this.logged) {
      this.logged = this.authService.getLoggedOrg()
    }
    
  }

}
