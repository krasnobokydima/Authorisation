import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILoginForm, ICurrentUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://ds-test-api.herokuapp.com/api/';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  isAuth() {
    return !!this.token;
  }

  login(params: ILoginForm): Observable<ICurrentUser> {
    return this.http.post<ICurrentUser>(`${this.URL}login`, params).pipe(
      tap((user: ICurrentUser) => {
        localStorage.setItem('auth-token', user.token);
        localStorage.setItem('role', JSON.stringify(user.role));
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }

  setToken(token: string | null) {
    this.token = token;
  }
}
