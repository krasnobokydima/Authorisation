import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): Observable<boolean> {
    if (localStorage.getItem('auth-token')) {
      return of(true);
    } else {
      this.router.navigate(['login']);
      return of(false);
    }
  }
}
