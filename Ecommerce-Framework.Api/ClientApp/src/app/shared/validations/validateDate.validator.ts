import { AbstractControl } from '@angular/forms';
export function DateValidator(control: AbstractControl): any {

  if (!control.value) {
    return null;
  }
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const parts = control.value.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (year < 1900 || year > 3000 || month === 0 || month > 12) {
    return { date: true };
  }
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }
  if (!(day > 0 && day <= monthLength[month - 1])) {
    return { date: true };
  }
  return null;
}
