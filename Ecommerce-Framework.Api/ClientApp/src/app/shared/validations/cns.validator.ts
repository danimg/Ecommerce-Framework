import { AbstractControl } from '@angular/forms';

export function cnsValidator(control: AbstractControl): any {
  if (!control.value) {
    return null;
  }
  const cnsValue = control.value.trim().split(' ');

  if (cnsValue[0].length !== 15) {
    return { cns: true };
  }
  let resto, soma, dv: number;
  let pis = null;
  let resultado = null;
  pis = cnsValue[0].substring(0, 11);
  const cns = cnsValue[0];
  if (cnsValue[0].substring(0, 1) === '7' || cnsValue[0].substring(0, 1) === '8' || cnsValue[0].substring(0, 1) === '9') {
    // tslint:disable-next-line: radix
    soma = ((parseInt(cns.substring(0, 1))) * 15) + ((parseInt(cns.substring(1, 2))) * 14) +
      // tslint:disable-next-line: radix
      ((parseInt(cns.substring(2, 3))) * 13) + ((parseInt(cns.substring(3, 4))) * 12) +
      // tslint:disable-next-line: radix
      ((parseInt(cns.substring(4, 5))) * 11) + ((parseInt(cns.substring(5, 6))) * 10) +
      // tslint:disable-next-line: radix
      ((parseInt(cns.substring(6, 7))) * 9) + ((parseInt(cns.substring(7, 8))) * 8) +
      // tslint:disable-next-line: radix
      ((parseInt(cns.substring(8, 9))) * 7) + ((parseInt(cns.substring(9, 10))) * 6) +
      // tslint:disable-next-line: radix
      ((parseInt(cns.substring(10, 11))) * 5) + ((parseInt(cns.substring(11, 12))) * 4) +
      // tslint:disable-next-line: radix
      ((parseInt(cns.substring(12, 13))) * 3) + ((parseInt(cns.substring(13, 14))) * 2) +
      // tslint:disable-next-line: radix
      ((parseInt(cns.substring(14, 15))) * 1);
    resto = soma % 11;

    if (resto !== 0) {
      return { cns: true };
    }

  } else {
    // tslint:disable-next-line: radix
    soma = ((parseInt(pis.substring(0, 1))) * 15) + ((parseInt(pis.substring(1, 2))) * 14) + ((parseInt(pis.substring(2, 3))) * 13) +
      // tslint:disable-next-line: radix
      ((parseInt(pis.substring(3, 4))) * 12) + ((parseInt(pis.substring(4, 5))) * 11) + ((parseInt(pis.substring(5, 6))) * 10) +
      // tslint:disable-next-line: radix
      ((parseInt(pis.substring(6, 7))) * 9) + ((parseInt(pis.substring(7, 8))) * 8) + ((parseInt(pis.substring(8, 9))) * 7) +
      // tslint:disable-next-line: radix
      ((parseInt(pis.substring(9, 10))) * 6) + ((parseInt(pis.substring(10, 11))) * 5);
    resto = soma % 11;
    dv = 11 - resto;

    if (dv === 11) {
      dv = 0;
    }

    if (dv === 10) {
      // tslint:disable-next-line: radix
      soma = ((parseInt(pis.substring(0, 1))) * 15) + ((parseInt(pis.substring(1, 2))) * 14) +
        // tslint:disable-next-line: radix
        ((parseInt(pis.substring(2, 3))) * 13) + ((parseInt(pis.substring(3, 4))) * 12) +
        // tslint:disable-next-line: radix
        ((parseInt(pis.substring(4, 5))) * 11) + ((parseInt(pis.substring(5, 6))) * 10) +
        // tslint:disable-next-line: radix
        ((parseInt(pis.substring(6, 7))) * 9) + ((parseInt(pis.substring(7, 8))) * 8) +
        // tslint:disable-next-line: radix
        ((parseInt(pis.substring(8, 9))) * 7) + ((parseInt(pis.substring(9, 10))) * 6) + ((parseInt(pis.substring(10, 11))) * 5) + 2;

      resto = soma % 11;
      dv = 11 - resto;
      resultado = pis + '001' + dv;
    } else {
      resultado = pis + '000' + dv;
    }
    if (cnsValue[0] !== resultado) {
      return { cns: true };
    }
  }
}
