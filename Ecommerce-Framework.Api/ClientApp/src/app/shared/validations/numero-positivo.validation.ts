import { AbstractControl } from '@angular/forms';

export function numeroPositivo(control: AbstractControl): any {
  if (control.value < 1) {
    return { numeroPositivo: true };
  }
  return null;
}
