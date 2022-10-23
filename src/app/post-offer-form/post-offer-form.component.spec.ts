import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOfferFormComponent } from './post-offer-form.component';

describe('PostOfferFormComponent', () => {
  let component: PostOfferFormComponent;
  let fixture: ComponentFixture<PostOfferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOfferFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOfferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
