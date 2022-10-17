import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public store: StoreService) {}
}
