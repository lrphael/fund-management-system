import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundEditModalComponent } from './fund-edit-modal.component';

describe('FundEditModalComponent', () => {
  let component: FundEditModalComponent;
  let fixture: ComponentFixture<FundEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundEditModalComponent]
    });
    fixture = TestBed.createComponent(FundEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
