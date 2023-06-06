import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FundsListComponent } from './components/funds-list/funds-list.component';

const routes: Routes = [
  { path: '', component: FundsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundsRoutingModule { }
