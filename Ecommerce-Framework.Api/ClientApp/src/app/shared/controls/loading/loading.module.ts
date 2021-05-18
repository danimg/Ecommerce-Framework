import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbLoadingComponent } from './loading.component';
import { NgbLoadingService } from './loading.service';

@NgModule({
  imports: [CommonModule],
  declarations: [NgbLoadingComponent],
  exports: [NgbLoadingComponent],
  entryComponents: [NgbLoadingComponent],
  providers: [NgbLoadingService]
})
export class NgbLoadingModule { }
