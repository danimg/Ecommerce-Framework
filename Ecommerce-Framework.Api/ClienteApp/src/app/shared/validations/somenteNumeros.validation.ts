import { AbstractControl } from '@angular/forms';

export function somenteNumerosValidator(control: AbstractControl): any {
  if (!control.value) {
    return null;
  }

  if (/[^\d]+/i.test(control.value)) {
    return { somenteNumeros: true };
  }

  return null;
}
