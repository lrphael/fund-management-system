import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './data/models/user.model';
import { loadUser } from './core/store/actions/user.actions';
import { AppState } from './core/store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this._loadStorage();
  }

  private _loadStorage(): void {
    this.store.dispatch(loadUser());
  }
}
