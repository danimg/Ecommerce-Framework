import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[pesoMask]', 
})
export class PesoMaskDirective { 

    constructor(
      public ngControl: NgControl,    
      public element: ElementRef,
      public renderer: Renderer2) { }
      @HostListener('ngModelChange', ['$event'])


   
    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
      this.onInputChange(event, false);
    }
  
    @HostListener('keydown.backspace', ['$event'])
    keydownBackspace(event) {
      this.onInputChange(event.target.value, true);
    }
    
    onInputChange(event: any, backspace) {
      let newVal = event.replace(/\D/g, '');
      if (backspace && newVal.length <= 6) {
        newVal = newVal.substring(0, newVal.length - 1);

      }      
      if (newVal.length === 0) {
        newVal ='';
      } else if (newVal.length <= 1) {
        newVal = newVal.replace(/^(\d{0,1})(\d{0,3})/, '$1.$2');
      }else if (newVal.length <= 2) {
        newVal = newVal.replace(/^(\d{0,1})(\d{0,3})/, '$1.$2');
      }else if (newVal.length <= 3) {
        newVal = newVal.replace(/^(\d{0,1})(\d{0,3})/, '$1.$2');

      } else if (newVal.length <= 4) {
        newVal = newVal.replace(/^(\d{0,1})(\d{0,3})/, '$1.$2');

      } else if (newVal.length <= 5) {
        newVal = newVal.replace(/^(\d{0,2})(\d{0,3})/, '$1.$2');

      } else if (newVal.length <= 6) {
        newVal = newVal.replace(/^(\d{0,3})(\d{0,4})/, '$1.$2'); 

      }   
     return this.ngControl.valueAccessor.writeValue(newVal);
 
    }
    
    toNumber(val){
      let valArr=val.split('');
      let valFiltered = valArr.filter(x=> !isNaN(x))
      let valProcessed = valFiltered.join('')
      return valProcessed;
        }

  }