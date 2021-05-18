import { FormGroup } from '@angular/forms';

export function dateBetweenValidator(formControlNameInicio: string, formControlNameFim: string): any {
  return (group: FormGroup): any => {

    const controlInicio = group.get(formControlNameInicio);
    const controlFim = group.get(formControlNameFim);

    if (!controlInicio.value || !controlFim.value) {
      return null;
    }

    if (new Date(controlInicio.value).valueOf() > new Date(controlFim.value).valueOf()) {
      return controlFim.setErrors({ dataFinal: true });
    }

    return null;
  };
}
