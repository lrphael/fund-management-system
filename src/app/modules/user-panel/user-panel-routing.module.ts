import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPanelComponent } from './user-panel.component';

const routes: Routes = [
  {
    path: '',
    component: UserPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'funds',
        pathMatch: 'full'
      },
      {
        path: 'funds',
        loadChildren: () => import('@modules/funds/funds.module').then(m => m.FundsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule { }
