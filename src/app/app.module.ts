import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { PostOfferFormComponent } from './post-offer-form/post-offer-form.component';
import { FormsModule } from '@angular/forms';
import { OffersViewComponent } from './offers-view/offers-view.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { FieldErrorMessageComponent } from './field-error-message/field-error-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NonAuthGuard } from './auth/guards/non-auth.guard';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Route[]=[

  {
    path: '',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'job-offers',
    component:  OfferListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'job-offers/create',
    component: PostOfferFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'job-offers/edit/:id',
    component: PostOfferFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    PostOfferFormComponent,
    OffersViewComponent,
    OfferListComponent,
    FieldErrorMessageComponent,
    LoginComponent,
    RegisterComponent,
    ProfileViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
