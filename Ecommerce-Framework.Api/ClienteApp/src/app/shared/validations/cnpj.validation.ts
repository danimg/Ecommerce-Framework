import { AbstractControl } from '@angular/forms';

export function cnpjValidator(control: AbstractControl): any {
  if (!control.value) {
    return null;
  }

  const cnpj = control.value.replace(/\D/g, '');

  if (cnpj.length != 14) {
    return { cnpj: true };
  }

  // Verifica se todos os dígitos são iguais.
  if (/^([0-9])\1*$/.test(cnpj)) {
    return { cnpj: true };
  }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);

  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) { soma += numeros.charAt(tamanho - i) * pos--; if (pos < 2) { pos = 9; } }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

  if (resultado != digitos.charAt(0)) {
    return { cnpj: true };
  }

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) { soma += numeros.charAt(tamanho - i) * pos--; if (pos < 2) { pos = 9; } }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) {
    return { cnpj: true };
  }

  return null;
}
