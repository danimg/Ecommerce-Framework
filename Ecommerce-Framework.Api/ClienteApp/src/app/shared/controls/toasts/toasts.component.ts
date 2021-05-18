import { Component, TemplateRef } from '@angular/core';
import { NgbToastService } from './toast.service';

@Component({
  selector: 'ngb-toasts',
  templateUrl: './toasts.component.html',
  host: { '[class.ngb-toasts]': 'true' }
})
export class ToastsContainer {
  constructor(public toastService: NgbToastService) { }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}