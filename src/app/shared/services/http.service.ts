import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChart, IReport, IUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private URL = 'http://ds-test-api.herokuapp.com/api/';

  constructor(private http: HttpClient) {}

  getReports(): Observable<IReport[]> {
    return this.http.get<IReport[]>(`${this.URL}userassessments`);
  }

  getChart(id: number): Observable<IChart> {
    const params = new HttpParams().set('id', id);

    return this.http.get<IChart>(`${this.URL}userassessment/graph`, { params });
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL}users`);
  }
}
