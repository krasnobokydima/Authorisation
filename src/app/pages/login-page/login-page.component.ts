import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  form: FormGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(private http: AuthService, private router: Router) {}

  onSubmit() {
    this.http.login(this.form.value).subscribe({
      next: () => this.router.navigate(['../']),
      error: () => console.log('Error'),
    });
  }
}
