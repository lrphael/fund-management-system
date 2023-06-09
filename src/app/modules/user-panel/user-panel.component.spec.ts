import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Observable, of } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';

import { AppState } from '@core/store/app.state';
import { userReducer } from '@core/store/reducers/user.reducer';
import { User } from '@models/user.model';

import { UserPanelComponent } from './user-panel.component';


const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  photo: 'path/to/photo',
  wallet: {
    currentBalance: 1000,
    totalInvestedBalance: 5000,
    investedFunds: []
  }
};

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPanelComponent],
      imports: [
        StoreModule.forRoot({ user: userReducer }),
        RouterTestingModule,
        MatToolbarModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPanelComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    const currentUser$: Observable<User | null> = of(mockUser);

    spyOn(store, 'pipe').and.returnValue(currentUser$);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentUser$ from store', () => {
    fixture.detectChanges();
    expect(component.currentUser$).toBeDefined();
  });
});
