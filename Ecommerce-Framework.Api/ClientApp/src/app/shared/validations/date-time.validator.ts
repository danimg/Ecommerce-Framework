import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function DateTimeValidator(control: AbstractControl): any {

  if (control.value == null)
    return null;

  var date = new Date(control.value);

  if (control.value.indexOf('/') > 0) {
    date = moment(control.value, 'DD/MM/YYYY HH:mm').toDate();
  }

  const isValid = !isNaN(date.valueOf());
  return isValid ? null : { datetime: true };
}
