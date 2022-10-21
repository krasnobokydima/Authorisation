import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile, tap } from 'rxjs';
import { IAuthState } from 'src/app/shared/models/interfaces';
import { setLogin } from 'src/app/shared/store/actions';
import { AuthSelectors } from 'src/app/shared/store/selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  form: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(private router: Router, private store: Store<IAuthState>) {}

  onSubmit() {
    this.store.dispatch(setLogin(this.form.value));
    this.store
      .select(AuthSelectors.getCurrentUser)
      .pipe(
        tap(() => this.router.navigate(['../'])),
        takeWhile((user) => !!user.token)
      ).subscribe();
  }
}
