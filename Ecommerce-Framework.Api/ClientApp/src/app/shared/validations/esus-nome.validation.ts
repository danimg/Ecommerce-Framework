import { AbstractControl, Validators } from '@angular/forms';

export function esusNomeValidator(control: AbstractControl): any {
  if (!control.value) {
    return null;
  }
  const nomes = control.value.trim().split(' ');
  if (control.value.length < 3) {
    return { esusMinlength: true };
  }
  if (control.value.length > 70) {
    return { esusMaxlength: true };
  }
  if (/( ){2,}/i.test(control.value)) {
    return { esusNomeEspaco: true };
  }

  if (!/^[a-z\u00C0-\u00ff A-Z ‘]+$/i.test(control.value)) {
    return { esusNomeLetras: true };
  }

  if (!/^[a-z\u00C0-\u00ff A-Z‘ ]* [a-z\u00C0-\u00ff A-Z‘ ]+$/i.test(control.value)) {
    return { esusNomeComposto: true };
  }
  const array = control.value.split(' ');
  if (array.length > 1) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].length < 3 && i === 0) {
        return { esusNomeDoisCaracteres: true };
      }
      if (array[i].length < 2 && i < 2) {
        return { esusNomeDoisCaracteres: true };
      }
    }
  } else {
    return { esusNomeUmTermo: true };
  }
  return null;
}
