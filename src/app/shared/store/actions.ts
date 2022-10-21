import { createAction, props } from '@ngrx/store';
import { ICurrentUser, ILoginForm, IPreparedChart, IReport, IUser } from '../models/interfaces';

export const setLogin = createAction('[Authorisation] Login', props<{ form: ILoginForm }>());
export const setLoginSuccess = createAction('[Authorisation] Login success', props<{ currentUser: ICurrentUser }>());
export const setLoginFail = createAction('[Authorisation] Login Fail');

export const setLogout = createAction('[Authorisation] Logout');

export const setReports = createAction('[Authorisation] Set reports');
export const setReportsSuccess = createAction('[Authorisation] Set reports success', props<{ reports: IReport[] }>());
export const setReportsFail = createAction('[Authorisation] Set reports Fail');

export const setCharts = createAction('[Authorisation] Set charts');
export const setChartsSuccess = createAction('[Authorisation] Set charts success', props<{ charts: IPreparedChart[] }>());
export const setChartsFail = createAction('[Authorisation] Set charts Fail');

export const setUsers = createAction('[Authorisation] Set users');
export const setUsersSuccess = createAction('[Authorisation] Set users success', props<{ users: IUser[] }>());
export const setUsersFail = createAction('[Authorisation] Set users Fail');
