import { Component } from '@angular/core';
import {AsyncValidatorFn, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {SignInCredentials} from "../auth.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
      ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  })


  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signIn(this.authForm.value as SignInCredentials).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox').then();
      },
      error: (error: HttpErrorResponse) => {
        const err = error.error;
        if (err.username || err.password) {
          this.authForm.setErrors({ credentials: true });
        }
      }
    });
  }
}
