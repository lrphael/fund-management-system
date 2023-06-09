import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { User } from '@models/user.model';
import { Fund } from '@models/fund.model';

import { AppState } from '@core/store/app.state';
import { userReducer } from '@core/store/reducers/user.reducer';

import { FundService } from '@services/fund.service';

import { FundsListComponent } from './funds-list.component';
import { FundDetailsModalComponent } from '../fund-details-modal/fund-details-modal.component';
import { FundEditModalComponent } from '../fund-edit-modal/fund-edit-modal.component';

describe('FundsListComponent', () => {
  let component: FundsListComponent;
  let fixture: ComponentFixture<FundsListComponent>;
  let store: MockStore<AppState>;
  let fundService: jasmine.SpyObj<FundService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo: 'path/to/photo',
    wallet: {
      currentBalance: 1000,
      totalInvestedBalance: 5000,
      investedFunds: []
    }
  };

  const mockFunds: Fund[] = [
    {
      id: 1,
      name: 'Fund 1',
      interest: 0.05,
      minimumValue: 1000,
      maximumValue: 5000,
      mandatoryPeriodMonths: 12,
      description: 'Fund 1 Description'
    },
    {
      id: 2,
      name: 'Fund 2',
      interest: 0.08,
      minimumValue: 2000,
      maximumValue: 10000,
      mandatoryPeriodMonths: 24,
      description: 'Fund 2 Description'
    }
  ];

  beforeEach(async () => {
    const fundServiceSpy = jasmine.createSpyObj('FundService', ['getAllFunds', 'deleteFund']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [FundsListComponent],
      imports: [
        StoreModule.forRoot({ user: userReducer }),
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore(),
        { provide: MatDialog, useValue: dialogSpy },
        { provide: FundService, useValue: fundServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fundService = TestBed.inject(FundService) as jasmine.SpyObj<FundService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsListComponent);
    component = fixture.componentInstance;

    store.setState({ user: { currentUser: mockUser, loading: false, error: null } });

    spyOn(component, 'getFunds').and.callFake(() => {
      component.funds = mockFunds;
      component.dataSource = new MatTableDataSource(mockFunds);
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource with funds', () => {
    expect(component.dataSource.data).toEqual(mockFunds);
  });

  it('should filter funds based on search term', () => {
    component.searchTerm = 'Fund 1';
    const filteredFunds = component.searchFunds();
    expect(filteredFunds.length).toBe(1);
    expect(filteredFunds[0].name).toBe('Fund 1');
  });

  it('should open fund details modal', () => {
    const fund: Fund = mockFunds[0];
    component.openFundDetailsModal(fund);
    expect(dialog.open).toHaveBeenCalledWith(FundDetailsModalComponent, {
      width: '400px',
      data: fund
    });
  });

  it('should check if fund is in wallet', () => {
    const fund: Fund = mockFunds[0];
    const isInWallet = component.isFundInWallet(fund);
    expect(isInWallet).toBe(false);
  });

  it('should compare values for sorting', () => {
    const sort: Sort = {
      active: 'name',
      direction: 'asc'
    };
    component.sortData(sort);
    expect(component.funds[0].name).toBe('Fund 1');
    expect(component.funds[1].name).toBe('Fund 2');
  });

  it('should delete fund', () => {
    const fund: Fund = mockFunds[0];
    const confirmDeleteSpy = spyOn(window, 'confirm').and.returnValue(true);
    fundService.deleteFund.and.returnValue(of(undefined));

    component.deleteFund(fund);

    expect(confirmDeleteSpy).toHaveBeenCalledWith('Are you sure you want to delete this fund?');
    expect(fundService.deleteFund).toHaveBeenCalledWith(fund.id!);
  });

  it('should open fund edit modal', () => {
    const fund: Fund = mockFunds[0];
    component.editFund(fund);
    expect(dialog.open).toHaveBeenCalledWith(FundEditModalComponent, {
      width: '400px',
      data: fund
    });
  });

  it('should open create fund modal', () => {
    component.openCreateFundModal();
    expect(dialog.open).toHaveBeenCalledWith(FundEditModalComponent, {
      width: '400px'
    });
  });
});
