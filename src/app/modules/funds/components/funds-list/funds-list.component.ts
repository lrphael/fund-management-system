import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Fund } from 'src/app/data/models/fund.model';
import { FundService } from 'src/app/data/services/fund.service';

import { FundDetailsModalComponent } from '../fund-details-modal/fund-details-modal.component';


@Component({
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrls: ['./funds-list.component.scss']
})
export class FundsListComponent implements OnInit {
  funds: Fund[] = [];
  searchTerm: string = '';

  constructor(private fundService: FundService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFunds();
  }

  getFunds(): void {
    this.fundService.getAllFunds().subscribe(
      funds => {
        this.funds = funds;
      },
      error => {
        console.error('Error fetching funds:', error);
      }
    );
  }

  searchFunds(): Fund[] {
    if (!this.searchTerm) {
      return this.funds;
    }

    return this.funds.filter(fund =>
      fund.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openFundDetailsModal(fund: Fund): void {
    const dialogRef = this.dialog.open(FundDetailsModalComponent, {
      width: '400px',
      data: fund
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fechado:', result);
    });
  }
}