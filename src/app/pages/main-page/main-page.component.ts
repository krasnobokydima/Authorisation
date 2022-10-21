import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/shared/models/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthSelectors } from 'src/app/shared/store/selectors';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  user$ = this.store.select(AuthSelectors.getCurrentUser);

  constructor(
    private router: Router,
    private auth: AuthService,
    public store: Store<IAuthState>
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');

    if (potentialToken) {
      this.auth.setToken(potentialToken);
    }
  }
}
