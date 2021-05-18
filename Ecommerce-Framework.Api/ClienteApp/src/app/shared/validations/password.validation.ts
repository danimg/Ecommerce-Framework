import { AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl): any {
  if (!control.value) {
    return null;
  }

  let valido = true;
  const nomes = control.value.trim().split(' ');

  nomes.forEach(nome => {
    if (!/.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/gm.test(nome)) {
      valido = false;
    }
  });

  if (!valido) {
    return { password: true };
  }
  return false;
}
