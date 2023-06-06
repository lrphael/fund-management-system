import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { FundsRoutingModule } from './funds-routing.module';

import { FundsListComponent } from './components/funds-list/funds-list.component';

@NgModule({
  declarations: [FundsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    FundsRoutingModule
  ]
})
export class FundsModule { }
