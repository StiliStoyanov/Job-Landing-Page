import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCandidatesViewComponent } from './list-candidates-view.component';

describe('ListCandidatesViewComponent', () => {
  let component: ListCandidatesViewComponent;
  let fixture: ComponentFixture<ListCandidatesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCandidatesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCandidatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
