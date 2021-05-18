import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgbToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = { classname: 'bg-info text-white' }) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
