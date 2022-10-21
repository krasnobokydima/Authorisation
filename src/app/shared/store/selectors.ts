import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authStateKey } from 'src/app/constants/store';
import { IAuthState } from '../models/interfaces';

const authSelector = createFeatureSelector<IAuthState>(authStateKey);

export namespace AuthSelectors {
  export const getCurrentUser = createSelector(authSelector, ({ currentUser }) => currentUser);
  export const getUsers = createSelector(authSelector, ({ users }) => users);
  export const getReports = createSelector(authSelector, ({ reports }) => reports);
  export const getPreparedReports = createSelector(authSelector, ({ reports }) => reports.map((report) => ({ name: report.name, id: report.id })));
  export const getCharts = createSelector(authSelector, ({ charts }) => charts);
  export const getError = createSelector(authSelector, ({ error }) => error);

  export const getPreparedCharts = createSelector(
    authSelector,
    ({ charts }) => charts
  );
}
