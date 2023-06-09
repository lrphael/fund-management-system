import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { Fund } from '@models/fund.model';
import { FundService } from '@services/fund.service';

import { FundEditModalComponent } from './fund-edit-modal.component';
import { MatInputModule } from '@angular/material/input';

class FundServiceMock {
  getFundMaxId(): Observable<number> {
    return of(10);
  }

  createFund(fund: Fund): Observable<Fund> {
    return of(fund);
  }

  updateFund(fund: Fund): Observable<Fund> {
    return of(fund);
  }
}

describe('FundEditModalComponent', () => {
  let component: FundEditModalComponent;
  let fixture: ComponentFixture<FundEditModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<FundEditModalComponent>>;
  let formBuilder: FormBuilder;
  let fundService: FundServiceMock;

  const mockData: Fund = {
    id: 1,
    name: 'Fund 1',
    interest: 0.05,
    minimumValue: 1000,
    maximumValue: 5000,
    mandatoryPeriodMonths: 12,
    description: 'Fund 1 Description'
  };

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [FundEditModalComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: FundService, useClass: FundServiceMock },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundEditModalComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<FundEditModalComponent>>;
    formBuilder = TestBed.inject(FormBuilder);
    fundService = TestBed.inject(FundService) as FundServiceMock;

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    setTimeout(() => {
      expect(component.fundForm).toBeDefined();
      expect(component.isEditMode).toBe(false);
    }, 2000);
  });

  it('should patch form values in edit mode', () => {
    component.data = mockData;
    setTimeout(() => {
      spyOn(component.fundForm, 'patchValue');
      expect(component.fundForm.patchValue).toHaveBeenCalledWith(mockData);
    }, 2000);
  });

  it('should create a fund object', () => {
    component.ngOnInit();
    const formValues: Fund = {
      id: 1,
      name: 'New Fund',
      interest: 0.1,
      minimumValue: 2000,
      maximumValue: 10000,
      mandatoryPeriodMonths: 24,
      description: 'New Fund Description'
    };
    component.fundForm.patchValue(formValues);
    const result = component['_createFundObject']();
    expect(result).toEqual(formValues);
  });


  it('should create a new fund request in create mode', () => {
    component.isEditMode = false;
    const formValues = formBuilder.group({
      name: ['', Validators.required],
      interest: ['', Validators.required],
      minimumValue: ['', Validators.required],
      maximumValue: ['', Validators.required],
      mandatoryPeriodMonths: ['', Validators.required],
      description: ['']
    }); 
    component.fundForm = formValues;
    setTimeout(() => {
      component.fundForm.patchValue(formValues);
      spyOn(fundService, 'getFundMaxId').and.returnValue(of(10));
      spyOn(fundService, 'createFund').and.returnValue(of(mockData));
  
      component.save();
  
      expect(fundService.getFundMaxId).toHaveBeenCalled();
      expect(fundService.createFund).toHaveBeenCalledWith(component['_createFundObject']());
      expect(dialogRef.close).toHaveBeenCalled();
    }, 2000);
  });

  it('should create a new fund request in edit mode', () => {
    component.isEditMode = true;
    const formValues = formBuilder.group({
      name: ['', Validators.required],
      interest: ['', Validators.required],
      minimumValue: ['', Validators.required],
      maximumValue: ['', Validators.required],
      mandatoryPeriodMonths: ['', Validators.required],
      description: ['']
    });  
    setTimeout(() => {
      component.fundForm.patchValue(formValues);
      spyOn(fundService, 'getFundMaxId').and.returnValue(of(10));
      spyOn(fundService, 'createFund').and.returnValue(of(mockData));
  
      component.save();
  
      expect(fundService.getFundMaxId).toHaveBeenCalled();
      expect(fundService.createFund).toHaveBeenCalledWith(component['_createFundObject']());
      expect(dialogRef.close).toHaveBeenCalled();
    }, 2000);
  });


  it('should close the dialog', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
