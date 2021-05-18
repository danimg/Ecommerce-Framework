import { AbstractControl } from '@angular/forms';

export function numeroPositivoZero(control: AbstractControl): any {
  if (control.value < 0) {
    return { numeroPositivoZero: true };
  }
  return null;
}
