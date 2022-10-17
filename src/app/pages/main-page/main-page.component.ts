import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  subs$: Subscription[] = [];
  constructor(
    private router: Router,
    private auth: AuthService,
    public store: StoreService,
    private http: HttpService
  ) {}

  logout() {
    this.auth.logout();
    this.store.logout();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');

    if (potentialToken) {
      this.auth.setToken(potentialToken);
    }

    this.store.setUser(JSON.parse('' + localStorage.getItem('user')));
    this.http.getReports().pipe(take(1)).subscribe()
  }
}
