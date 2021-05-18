import { Directive, forwardRef, HostListener } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormatPipe } from '../pipes/format.pipe';

@Directive({
  selector: '[alturaMask]', 
})
export class AlturaMaskDirective { 

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
      this.onInputChange(event, false);
    }
  
    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
      this.onInputChange(event.target.value, true);
    }
    
  
    onInputChange(event, backspace) {
      let newVal = event.replace(/\D/g, '');
      if (backspace && newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);
      }
      if (newVal.length === 0) {
        newVal ='';
      } else if (newVal.length <= 1) {
        newVal = newVal.replace(/^(\d{0,1})(\d{0,1})/, '$1.$2');
      }else if (newVal.length <= 2) {
        newVal = newVal.replace(/^(\d{0,1})(\d{0,1})/, '$1.$2');
      }else if (newVal.length <= 3) {
        newVal = newVal.replace(/^(\d{0,2})(\d{0,1})/, '$1.$2');
      } else if (newVal.length <= 4) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,1})/, '$1.$2');
      } else if (newVal.length <= 5) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,1})/, '$1.$2');
      } 
      this.ngControl.valueAccessor.writeValue(""+ newVal);
   
    }
  
    toNumber(val){
  let valArr=val.split('');
  let valFiltered = valArr.filter(x=> !isNaN(x))
  let valProcessed = valFiltered.join('')
  return valProcessed;
    }
  }
  