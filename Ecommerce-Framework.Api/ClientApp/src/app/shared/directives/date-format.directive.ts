import { Directive, Input, ElementRef, Renderer2, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[date-format]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateFormatDirective),
      multi: true
    },
    DatePipe
  ]
})

export class DateFormatDirective implements ControlValueAccessor {
  @Input() format: string;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private datePipe: DatePipe) {
  }

  set value(val) {
    this.onChange(val);
    this.onTouched(val);
  }

  writeValue(obj: any): void {
    const format = this.datePipe.transform(obj, 'yyyy-MM-dd');
    this.renderer.setProperty(this.element.nativeElement, 'value', format);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(this.element.nativeElement, 'disabled', isDisabled);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    const value = this.element.nativeElement.value;
    this.renderer.setProperty(this.element.nativeElement, 'value', value);
    this.onChange(value);
    return;
  }
}
