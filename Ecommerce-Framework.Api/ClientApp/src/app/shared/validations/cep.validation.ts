import { AbstractControl } from '@angular/forms';

export function cepValidator(control: AbstractControl): any {
  if (!control.value) {
    return null;
  }

  const cep = control.value.replace(/\D/g, '');

  if (cep.length != 8) {
    return { cep: true };
  }

  // Verifica se todos os dígitos são iguais.
  if (/^([0-9])\1*$/.test(cep)) {
    return { cep: true };
  }

  return null;
}
