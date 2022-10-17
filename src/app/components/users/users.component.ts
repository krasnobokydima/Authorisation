import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
import { IUser } from 'src/app/shared/models/interfaces';
import { HttpService } from 'src/app/shared/services/http.service';
import { StoreService } from 'src/app/shared/services/store.service';

import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  tableHeaders = ['position', 'Name', 'Last name', 'Email', 'Select'];
  selectedUsers: IUser[] = [];

  constructor(private http: HttpService, public store: StoreService) {}

  onSelecttUser(user: IUser) {
    const isUserSelect = this.selectedUsers.find(
      (selectedUser) => selectedUser.position === user.position
    );

    if (isUserSelect) {
      this.selectedUsers = this.selectedUsers.filter(
        (selectUser) => selectUser.position !== user.position
      );
    } else {
      this.selectedUsers.push(user);
    }
  }

  onDownloadFile() {
    new AngularCsv(this.selectedUsers, 'Users')
  }

  ngOnInit(): void {
    this.http.getUsers().pipe(take(1)).subscribe();
  }
}
