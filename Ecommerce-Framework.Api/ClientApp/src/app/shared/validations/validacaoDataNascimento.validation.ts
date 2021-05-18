import { AbstractControl } from '@angular/forms';
export function dataNascimentoValidator(control: AbstractControl): any {

  if (!control.value) {
    return null;
  }
  const dataAtual = new Date(); 
  const dataNascimento =  new Date(control.value); 
 
  const dias = (1000 * 60 * 60 * 24); 



  if(dataNascimento >= dataAtual){

    return { dataNascimentoMax: true };

  }
  if((dataAtual.getFullYear() - dataNascimento.getFullYear()) >= 130){

    return { dataNascimentoMin: true };

  }
  return null;
}
