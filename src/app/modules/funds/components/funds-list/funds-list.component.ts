import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

import { User } from '@models/user.model';
import { Fund } from '@models/fund.model';

import { AppState } from '@core/store/app.state';
import { getCurrentUser } from '@state/selectors/user.selectors';
import { FundService } from '@services/fund.service';

import { FundDetailsModalComponent } from '../fund-details-modal/fund-details-modal.component';
import { FundEditModalComponent } from '../fund-edit-modal/fund-edit-modal.component';

@Component({
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrls: ['./funds-list.component.scss']
})
export class FundsListComponent implements OnInit {
  funds: Fund[] = [];
  searchTerm: string = '';
  currentUser$: Observable<User | null>;

  dataSource!: MatTableDataSource<Fund>;
  columnsToDisplay: string[] = ['name', 'interest', 'minimumValue', 'maximumValue', 'mandatoryPeriodMonths', 'actions'];

  @ViewChild(MatSort) matSort!: MatSort;

  constructor(
    private fundService: FundService,
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {
    this.currentUser$ = this.store.pipe(select(getCurrentUser));
  }

  ngOnInit(): void {
    this.getFunds();
  }

  getFunds(): void {
    this.fundService.getAllFunds().subscribe(
      funds => {
        this.funds = funds;
        this._initializeDataSource();
      },
      error => {
        console.error('Error fetching funds:', error);
      }
    );
  }

  private _initializeDataSource(): void {
    this.dataSource = new MatTableDataSource(this.funds);
    this.dataSource.sort = this.matSort;
  }

  searchFunds(): Fund[] {
    if (!this.searchTerm) {
      return this.funds;
    }

    return this.funds.filter(fund =>
      fund.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openFundDetailsModal(fund: Fund): void {
    this.dialog.open(FundDetailsModalComponent, {
      width: '400px',
      data: fund
    });
  }

  isFundInWallet(fund: Fund): boolean {
    let isInWallet = false;
    this.currentUser$.subscribe(user => {
      if (user) {
        const fundIds = user.wallet.investedFunds.map(investedFund => investedFund.fundId);
        isInWallet = fundIds.includes(fund.id);
      }
    });
    return isInWallet;
  }

  private _compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {
    const data = this.funds.slice();
    if (!sort.active || sort.direction === '') {
      this.funds = data;
      return;
    }

    this.funds = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this._compare(a.name, b.name, isAsc);
        case 'interest':
          return this._compare(a.interest, b.interest, isAsc);
        case 'minimumValue':
          return this._compare(a.minimumValue, b.minimumValue, isAsc);
        case 'maximumValue':
          return this._compare(a.maximumValue, b.maximumValue, isAsc);
        case 'mandatoryPeriodMonths':
          return this._compare(a.mandatoryPeriodMonths, b.mandatoryPeriodMonths, isAsc);
        default:
          return 0;
      }
    });
  }

  editFund(fund: Fund): void {
    this.dialog.open(FundEditModalComponent, {
      width: '400px',
      data: fund
    });
  }

}
