import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private http: HttpService, public store: StoreService) { }

  ngOnInit(): void {
    this.http.getUsers().pipe(take(1)).subscribe()
  }

}
