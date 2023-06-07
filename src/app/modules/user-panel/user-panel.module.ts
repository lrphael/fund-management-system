import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelComponent } from './user-panel.component'; 
import { UserPanelRoutingModule } from './user-panel-routing.module';

@NgModule({
  declarations: [UserPanelComponent],
  imports: [
    CommonModule,
    UserPanelRoutingModule
  ]
})
export class UserPanelModule { }
