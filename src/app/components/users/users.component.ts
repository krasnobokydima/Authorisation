import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

import { IAuthState, IUser } from 'src/app/shared/models/interfaces';
import { tableHeaders } from '../../constants/store';
import { setUsers } from 'src/app/shared/store/actions';
import { AuthSelectors } from 'src/app/shared/store/selectors';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$ = this.store.select(AuthSelectors.getUsers);
  tableHeaders = tableHeaders;
  selectedUsers: IUser[] = [];

  constructor(public store: Store<IAuthState>) {}

  ngOnInit(): void {
    this.store.dispatch(setUsers())
  }

  onDownloadFile() {
    new AngularCsv(this.selectedUsers, 'Users')
  }

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
}
