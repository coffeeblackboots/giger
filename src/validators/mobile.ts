import { FormControl } from '@angular/forms';

export class MobileValidator {
  static isValid(control: FormControl) {
    const rm = /^\+?\d{10}$/
    .test(
      control.value
    );

    if (rm) {
      return null;
    }

    return {
      invalidMobile: true
    };
  }
}