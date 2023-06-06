import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './data/models/user.model';
import { loadUser } from './core/store/actions/user.actions';
import { getCurrentUser, isLoading } from './core/store/selectors/user.selectors';
import { AppState } from './core/store/app.state';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  currentUser$!: Observable<User | null>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this._loadStorage();
    this._loadUser();
  }
  
  private _loadStorage(): void {
    this.store.dispatch(loadUser());
  }
  
  private _loadUser(): void {
    this.currentUser$ = this.store.pipe(
      select(getCurrentUser)
    );
    this.isLoading$ = this.store.pipe(
      select(isLoading)
    );

  }
}
