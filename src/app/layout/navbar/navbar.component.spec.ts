import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { NavbarComponent } from './navbar.component';
import { AppState } from '@core/store/app.state';
import { User } from '@models/user.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  photo: 'path/to/photo',
  wallet: {
    currentBalance: 1000,
    totalInvestedBalance: 5000,
    investedFunds: [{ fundId: 1, investedValue: 10000, currentBalance: 12000, withdrawalDate: '2029-09-09' }]
  }
};

class StoreMock {
  dispatch() { }
  pipe() {
    return of(mockUser);
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        provideMockStore(),
        { provide: Store, useClass: StoreMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.setState({ user: { currentUser: mockUser, loading: false, error: null } });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
