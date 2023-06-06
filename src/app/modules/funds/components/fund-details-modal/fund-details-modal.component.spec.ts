import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundDetailsModalComponent } from './fund-details-modal.component';

describe('FundDetailsModalComponent', () => {
  let component: FundDetailsModalComponent;
  let fixture: ComponentFixture<FundDetailsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundDetailsModalComponent]
    });
    fixture = TestBed.createComponent(FundDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
