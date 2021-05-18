import { FormatPipe } from './../pipes/format.pipe';
import { Directive, HostListener, Input, ElementRef, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskDirective),
      multi: true
    },
    FormatPipe
  ]
})

export class MaskDirective implements ControlValueAccessor {
  @Input() mask: string;

  onChange: any = () => { };
  onTouched: any = () => { };

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    private formatPipe: FormatPipe) {
  }

  set value(val) {
      this.onChange(val);
      this.onTouched(val);
  }

  writeValue(obj: any): void {
    if (obj != null) {
      const format = this.formatPipe.transform(obj, this.mask);
      this.renderer.setProperty(this.element.nativeElement, 'value', format);
      this.onChange(format);
    } else {
      this.renderer.setProperty(this.element.nativeElement, 'value', '');
    }
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

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    if ($event.keyCode !== 8) {
      const value = this.element.nativeElement.value;
      const format = this.formatPipe.transform(value, this.mask);
      this.renderer.setProperty(this.element.nativeElement, 'value', format);
      this.onChange(value);
      return;
    }
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    const value = this.element.nativeElement.value;
    const format = this.formatPipe.transform(value, this.mask);
    this.renderer.setProperty(this.element.nativeElement, 'value', format);
    this.onChange(value);
    return;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown($event: any) {
    const value = this.element.nativeElement.value;
    if ($event.keyCode !== 8) {
      if (value.length >= this.mask.length) {
        return;
      }
      this.onTouched();
    }
  }
}
