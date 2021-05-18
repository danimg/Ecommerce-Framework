import { AbstractControl } from '@angular/forms';

export function somenteLetrasValidator(control: AbstractControl): any {
  if (!control.value) {
    return null;
  }

  let valido = true;
  const nomes = control.value.trim().split(' ');

  nomes.forEach(nome => {
    if (!/^[a-záàâãéèêíïóôõöúçñü‘]+$/i.test(nome)) {
      valido = false;
    }
  });

  if (!valido) {
    return { somenteLetras: true };
  }

  return null;
}
