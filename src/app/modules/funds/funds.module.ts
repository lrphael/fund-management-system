import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { FundsRoutingModule } from './funds-routing.module';

import { FundDetailsModalComponent } from './components/fund-details-modal/fund-details-modal.component';
import { FundEditModalComponent } from './components/fund-edit-modal/fund-edit-modal.component';
import { FundsListComponent } from './components/funds-list/funds-list.component';

@NgModule({
  declarations: [
    FundDetailsModalComponent,
    FundEditModalComponent,
    FundsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FundsRoutingModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule
  ]
})
export class FundsModule { }
