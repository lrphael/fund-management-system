import { Component, OnInit } from '@angular/core';

import { Fund } from 'src/app/data/models/fund.model';
import { FundService } from 'src/app/data/services/fund.service';


@Component({
  selector: 'app-funds-list',
  templateUrl: './funds-list.component.html',
  styleUrls: ['./funds-list.component.scss']
})
export class FundsListComponent implements OnInit {
  funds: Fund[] = [];
  searchTerm: string = '';

  constructor(private fundService: FundService) {}

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
}
