import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

import { FundsRoutingModule } from './funds-routing.module';

import { FundsListComponent } from './components/funds-list/funds-list.component';
import { FundDetailsModalComponent } from './components/fund-details-modal/fund-details-modal.component';

@NgModule({
  declarations: [
    FundDetailsModalComponent,
    FundsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FundsRoutingModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatIconModule,
    MatSliderModule
  ]
})
export class FundsModule { }
