import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { User } from '@models/user.model';

import { AppState } from '@core/store/app.state';
import { getCurrentUser } from '@state/selectors/user.selectors';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser$!: Observable<User | null>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this._loadUser();
  }

  private _loadUser(): void {
    this.currentUser$ = this.store.pipe(
      select(getCurrentUser)
    );
  }

}
