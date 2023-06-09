import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';

import { loadUser } from '@core/store/actions/user.actions';
import { userReducer, UserState } from '@core/store/reducers/user.reducer';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<UserState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [
        StoreModule.forRoot({ user: userReducer }),
        RouterTestingModule,
        MatToolbarModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUser action on initialization', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(loadUser());
  });
});