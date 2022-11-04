import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedViewComponent } from './applied-view.component';

describe('AppliedViewComponent', () => {
  let component: AppliedViewComponent;
  let fixture: ComponentFixture<AppliedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
