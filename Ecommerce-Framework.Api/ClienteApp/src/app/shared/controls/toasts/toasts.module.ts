import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastsContainer } from './toasts.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastService } from './toast.service';

@NgModule({
  declarations: [ToastsContainer],
  imports: [CommonModule, NgbToastModule],
  exports: [ToastsContainer],
  providers: [NgbToastService]
})
export class NgbToastsModule {
}
