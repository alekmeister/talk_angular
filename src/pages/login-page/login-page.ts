import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '@services/auth/auth';
import {Router} from '@angular/router';

interface LoginForm {
  username: FormControl<string>
  password: FormControl<string>
}

@Component({
  selector: 'app-login-page',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})



export class LoginPage {

  authService = inject(AuthService)
  router = inject(Router)

  form = new FormGroup<LoginForm>({
    username: new FormControl('', {nonNullable: true, validators: Validators.required}),
    password: new FormControl('', {nonNullable: true, validators: Validators.required}),
  })

  onSubmit() {

    if(this.form.valid) {
     this.authService.login(this.form.getRawValue()).subscribe(res => {
       this.router.navigate([''])
       console.log(res)
     })
    }
  }
}
