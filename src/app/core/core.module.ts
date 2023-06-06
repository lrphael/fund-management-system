import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ user: userReducer }),
    EffectsModule.forRoot([UserEffects])
  ]
})
export class CoreModule { }
