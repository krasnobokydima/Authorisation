import { createReducer, on } from '@ngrx/store';
import { IAuthState } from '../models/interfaces';
import {
  setLogout,
  setChartsFail,
  setChartsSuccess,
  setLoginFail,
  setLoginSuccess,
  setReportsFail,
  setReportsSuccess,
  setUsersFail,
  setUsersSuccess,
} from './actions';

export const initialState: IAuthState = {
  currentUser: {},
  users: [],
  reports: [],
  charts: [],
};

export const authReducer = createReducer(
  initialState,
  on(setLoginSuccess, (state, { currentUser }) => ({ ...state, currentUser })),
  on(setLogout, () => ({ ...initialState })),

  on(setReportsSuccess, (state, { reports }) => ({
    ...state,
    reports: [...state.reports, ...reports],
  })),
  on(setChartsSuccess, (state, { charts }) => ({
    ...state,
    charts: [...state.charts, ...charts],
  })),
  on(setUsersSuccess, (state, { users }) => ({
    ...state,
    users: [...state.users, ...users],
  })),

  on(setLoginFail, (state) => ({ ...state, error: 'login Fail' })),
  on(setReportsFail, (state) => ({ ...state, error: 'report Fail' })),
  on(setChartsFail, (state) => ({ ...state, error: 'chart Fail' })),
  on(setUsersFail, (state) => ({ ...state, error: 'users Fail' }))
);
