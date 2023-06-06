import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fund } from 'src/app/data/models/fund.model';

@Component({
  selector: 'app-fund-details-modal',
  templateUrl: './fund-details-modal.component.html',
  styleUrls: ['./fund-details-modal.component.scss']
})
export class FundDetailsModalComponent {
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }

  selectedFund!: Fund;
  showInvestmentForm: boolean = false;
  investmentAmount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<FundDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fund
  ) {
    this.selectedFund = data;
  }

  isInvested(fund: Fund): boolean {
    return false;
  }

  investInFund(): void {
    this.showInvestmentForm = true;
  }

  confirmInvestment(): void {
    const investmentAmount = this.investmentAmount;
    console.log('Investimento confirmado:', investmentAmount);

    this.showInvestmentForm = false;
  }

  close(): void {
    this.dialogRef.close();
  }
}
