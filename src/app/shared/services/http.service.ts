import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { IGraph, IReport, IUser } from '../models/interfaces';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public URL = 'http://ds-test-api.herokuapp.com/api/';

  constructor(private http: HttpClient, private store: StoreService) {}

  getReports(): Observable<IReport[]> {
    return this.http.get<IReport[]>(`${this.URL}userassessments`).pipe(
      tap((reports) => {
        this.store.setReports(reports);
        reports.forEach(({ id, name }) => {
          this.getChart(id)
            .pipe(take(1))
            .subscribe(({ data }) => {
              const currentChart = {
                name,
                chartKeys: Object.keys(data),
                chartValues: Object.values(data),
              };

              this.store.setGraphs(currentChart);
            });
        });
      })
    );
  }

  getChart(id: number): Observable<IGraph> {
    const params = new HttpParams().set('id', id);

    return this.http.get<IGraph>(`${this.URL}userassessment/graph`, { params });
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}users`).pipe(
      tap((users) => {
        const newUsers = users.map((user, index) => ({
          ...user,
          position: index + 1,
        }));

        this.store.setUsers(newUsers);
      })
    );
  }
}
