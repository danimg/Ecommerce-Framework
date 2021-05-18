import { FormGroup } from '@angular/forms';

export function equalValidator(formControlName: string, formControlNameCompare: string): any {
  return (group: FormGroup): any => {

    const control = group.get(formControlName);

    if (!control.value) {
      return null;
    }
    const compare = group.get(formControlNameCompare).value;

    if (control.value !== compare) {
      return control.setErrors({ equal: true });
    }

    return null;
  };
}
