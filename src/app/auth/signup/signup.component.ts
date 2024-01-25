import { Component } from '@angular/core';
import {AsyncValidatorFn, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatchPassword} from "../validators/match-password";
import {UniqueUsername} from "../validators/unique-username";
import {AuthService} from "../auth.service";
import {SignupCredentials} from "../auth.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  authForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-z0-9]+$/)
      ],
      asyncValidators: [this.uniqueUsername.validate.bind(this.uniqueUsername) as AsyncValidatorFn],
      updateOn: 'blur'
    }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  }, { validators: [this.matchPassword.validate] });


  constructor(private matchPassword: MatchPassword,
              private uniqueUsername: UniqueUsername,
              private authService: AuthService) {

  }

  onSubmit(authForm: FormGroup) {
    if (this.authForm.invalid) return;

    this.authService.signup(this.authForm.value as SignupCredentials).subscribe({
      next: response =>  {

      },
      error: (err: HttpErrorResponse) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true })
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      }
    })
  }
}
