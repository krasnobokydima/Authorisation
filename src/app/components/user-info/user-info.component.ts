import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/shared/models/interfaces';
import { setLoginSuccess } from 'src/app/shared/store/actions';
import { AuthSelectors } from 'src/app/shared/store/selectors';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  user$ = this.store.select(AuthSelectors.getCurrentUser);

  constructor(public store: Store<IAuthState>) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('user');

    if (currentUser) {
      this.store.dispatch(
        setLoginSuccess({
          currentUser: JSON.parse(currentUser),
        })
      );
    }
  }
}
