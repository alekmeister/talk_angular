import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/auth/auth';
import { Router } from '@angular/router';
import { PasswordIcon } from '@shared/icons/password-icon/password-icon';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, PasswordIcon],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal(false);

  form = new FormGroup<LoginForm>({
    username: new FormControl('', { nonNullable: true, validators: Validators.required }),
    password: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
