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

const routes: Route[]=[
  {
    path: 'job-offers',
    component:  OfferListComponent,
  },
  {
    path: 'job-offers/create',
    component: PostOfferFormComponent
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
    FieldErrorMessageComponent
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
