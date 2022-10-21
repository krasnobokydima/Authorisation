import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState } from 'src/app/shared/models/interfaces';
import { setLogin } from 'src/app/shared/store/actions';

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

  constructor(private store: Store<IAuthState>) {}

  onSubmit() {
    this.store.dispatch(setLogin({ form: this.form.value }));
  }
}
