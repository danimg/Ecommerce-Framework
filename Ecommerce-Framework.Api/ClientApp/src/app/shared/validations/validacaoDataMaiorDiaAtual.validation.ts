import { AbstractControl } from '@angular/forms';
export function DataMaiorDiaAtualValidator(control: AbstractControl): any {

  if (!control.value) {
    return null;
  }
  const dataAtual = new Date();
  const data = new Date(control.value);
  if (data> dataAtual) {
    return { dataMaiorDiaAtual: true };
  }

  return null;
}
