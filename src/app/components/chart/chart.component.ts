import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { pipe, takeWhile, tap } from 'rxjs';
import { IAuthState, IPreparedChart } from 'src/app/shared/models/interfaces';
import { setCharts } from 'src/app/shared/store/actions';
import { AuthSelectors } from 'src/app/shared/store/selectors';

@Component({
  selector: 'app-graph',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  charts: IPreparedChart[] = []
  constructor(public store: Store<IAuthState>) {}

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.getReports)
      .pipe(
        tap(() => this.store.dispatch(setCharts())),
        takeWhile((val) => val.length === 0)
      ).subscribe();

    this.store.select(AuthSelectors.getCharts)
      .pipe(
        tap(charts => this.charts = JSON.parse(JSON.stringify(charts))),
        takeWhile((charts) => charts.length === 0),
      ).subscribe()
  }
}
