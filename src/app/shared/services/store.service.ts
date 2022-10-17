import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  IReport,
  ICurrentUser,
  IUser,
  IPreparedGraph,
} from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public graphs$$ = new BehaviorSubject<IPreparedGraph[]>([]);
  public reports$$ = new BehaviorSubject<IReport[]>([]);
  public user$$ = new BehaviorSubject<Partial<ICurrentUser>>({});
  public users$$ = new BehaviorSubject<IUser[]>([]);

  setGraphs(graph: IPreparedGraph) {
    const graphs = [...this.graphs$$.value, graph];
    this.graphs$$.next(graphs);
  }

  setReports(reports: IReport[]) {
    this.reports$$.next(reports);
  }

  setUser(user: ICurrentUser) {
    this.user$$.next(user);
  }

  setUsers(users: IUser[]) {
    this.users$$.next(users);
  }

  logout() {
    this.graphs$$.next([]);
    this.reports$$.next([]);
    this.user$$.next({});
    this.users$$.next([]);
  }
}
