import {AbstractControl, FormGroup, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MatchPassword implements Validator {

  validate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');

    if (password && passwordConfirmation && password.value === passwordConfirmation.value) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  };
}
