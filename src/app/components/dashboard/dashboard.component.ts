import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/shared/models/interfaces';
import { setReports } from 'src/app/shared/store/actions';
import { AuthSelectors } from 'src/app/shared/store/selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  reports$ = this.store.select(AuthSelectors.getReports);

  constructor(public store: Store<IAuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(setReports())
  }
}
