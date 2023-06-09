import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { Fund } from '@models/fund.model';
import { User, InvestedFund } from '@models/user.model';

import { FundDetailsModalComponent } from './fund-details-modal.component';
import { AppState } from '@core/store/app.state';
import { updateUser } from '@core/store/actions/user.actions';



const mockData: Fund = {
  id: 1,
  name: 'Fund 1',
  interest: 0.05,
  minimumValue: 1000,
  maximumValue: 5000,
  mandatoryPeriodMonths: 12,
  description: 'Fund 1 Description'
};

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  photo: 'path/to/photo',
  wallet: {
    currentBalance: 1000,
    totalInvestedBalance: 5000,
    investedFunds: [{ fundId: 1, investedValue: 10000, currentBalance: 12000, withdrawalDate: '2029-09-09' }]
  }
};

class StoreMock {
  dispatch() { }
  pipe() {
    return of(mockUser);
  }
}

describe('FundDetailsModalComponent', () => {
  let component: FundDetailsModalComponent;
  let fixture: ComponentFixture<FundDetailsModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<FundDetailsModalComponent>>;
  let store: Store<AppState>;


  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [FundDetailsModalComponent],
      imports: [
        MatDialogModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: Store, useClass: StoreMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundDetailsModalComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<FundDetailsModalComponent>>;
    store = TestBed.inject(Store);

    component.currentUser = mockUser;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate max investment amount correctly', () => {
    const expectedAmount = Math.min(mockUser.wallet.currentBalance, mockData.maximumValue);
    const calculatedAmount = component.calculateMaxInvestmentAmount();
    expect(calculatedAmount).toBe(expectedAmount);
  });

  it('should check if fund is in wallet correctly', () => {
    const investedFund: InvestedFund = {
      fundId: mockData.id!,
      investedValue: component.investmentAmount,
      currentBalance: component.investmentAmount,
      withdrawalDate: '2023-06-01'
    };
    component.currentUser.wallet.investedFunds.push(investedFund);
    component.ngOnInit();
    const isInWallet = component.isFundInWallet();
    expect(isInWallet).toBeTrue();
  });

  it('should get remaining time correctly', () => {
    const expectedTime = ' days left';
    const remainingTime = component.getRemainingTime();
    expect(remainingTime).toContain(expectedTime);
  });

  it('should get balance correctly', () => {
    const expectedBalance = 10005;
    const balance = component.getBalance();
    expect(balance).toBe(expectedBalance);
  });

  it('should withdraw from wallet correctly', () => {
    spyOn(store, 'dispatch');
    component.withdrawFromWallet();
    component.currentUser.wallet.currentBalance = 1000;
    const expectedUpdatedInvestedFunds: InvestedFund[] = [];
    const expectedTotalInvestment = 0;
    expect(store.dispatch).toHaveBeenCalledWith(updateUser({ currentUser: { ...mockUser, wallet: { ...mockUser.wallet, investedFunds: expectedUpdatedInvestedFunds, totalInvestedBalance: expectedTotalInvestment } } }));
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should confirm investment correctly', () => {
    component.investmentAmount = 6000;
    const investedFund: InvestedFund = {
      fundId: mockData.id!,
      investedValue: component.investmentAmount,
      currentBalance: component.investmentAmount,
      withdrawalDate: '2023-06-01'
    };

    component.currentUser.wallet.investedFunds = [];
    component.currentUser.wallet.totalInvestedBalance = 0;

    const expectedCurrentBalance = component.currentUser.wallet.currentBalance - component.investmentAmount;
    const expectedTotalInvestedBalance = component.currentUser.wallet.totalInvestedBalance + component.investmentAmount;

    component.confirmInvestment();

    component.currentUser.wallet.investedFunds[0].withdrawalDate = '2023-06-01';
    expect(component.currentUser.wallet.investedFunds).toContain(investedFund);
    expect(component.currentUser.wallet.currentBalance).toBe(expectedCurrentBalance);
    expect(component.currentUser.wallet.totalInvestedBalance).toBe(expectedTotalInvestedBalance);
  });

  it('should generate withdrawal date correctly', () => {
    const withdrawalDate = component.generateWithdrawalDate();
    expect(withdrawalDate).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it('should pad number correctly', () => {
    const paddedNumber = component.padNumber(9);
    expect(paddedNumber).toBe('09');
  });

  it('should close the dialog', () => {
    component.close();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
