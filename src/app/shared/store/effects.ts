import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import {
  setLogin,
  setCharts,
  setChartsSuccess,
  setLoginFail,
  setLoginSuccess,
  setReports,
  setReportsFail,
  setReportsSuccess,
  setUsers,
  setUsersFail,
  setUsersSuccess,
  setChartsFail,
} from './actions';
import {
  catchError,
  concatAll,
  exhaustMap,
  map,
  mergeMap,
  of,
  reduce,
  withLatestFrom,
} from 'rxjs';
import { IAuthState, IPreparedChart } from '../models/interfaces';
import { Store } from '@ngrx/store';
import { AuthSelectors } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthorisationEffects {
  constructor(
    private actions: Actions,
    private auth: AuthService,
    private http: HttpService,
    private router: Router,
    private store: Store<IAuthState>
  ) {}

  charts$ = createEffect(() =>
    this.actions.pipe(
      ofType(setCharts),
      withLatestFrom(this.store.select(AuthSelectors.getPreparedReports)),
      map(([_event, reports]) => reports),
      concatAll(),
      mergeMap(({ id, name }) =>
        this.http.getChart(id).pipe(
          map(({ data }) => ({
            labels: Object.keys(data),
            datasets: [
              {
                data: Object.values(data).map((value) => Math.round(value)),
                label: name,
              },
            ],
          })),
          reduce((acc: IPreparedChart[], item) => [...acc, item], [])
        )
      ),
      map((charts) => setChartsSuccess({ charts })),
      catchError(() => of(setChartsFail()))
    )
  );

  loginUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(setLogin),
      exhaustMap(({ form: { email, password } }) =>
        this.auth.login({ email, password }).pipe(
          map((currentUser) => {
            this.auth.setToken(currentUser.token);
            this.router.navigate(['../']);
  
            return setLoginSuccess({ currentUser });
          }),
          catchError(() => of(setLoginFail()))
        )
      )
    )
  );

  reports$ = createEffect(() =>
    this.actions.pipe(
      ofType(setReports),
      exhaustMap(() =>
        this.http.getReports().pipe(
          map((reports) => setReportsSuccess({ reports })),
          catchError(() => of(setReportsFail()))
        )
      )
    )
  );

  users$ = createEffect(() =>
    this.actions.pipe(
      ofType(setUsers),
      exhaustMap(() =>
        this.http.getUsers().pipe(
          map((users) => {
            const newUsers = users.map((user, index) => ({
              ...user,
              position: index + 1,
            }));

            return setUsersSuccess({ users: newUsers });
          }),
          catchError(() => of(setUsersFail()))
        )
      )
    )
  );
}
