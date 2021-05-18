import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgbIconModule } from '../icon/icon.module';
import { NgbMultiDatePicker } from './multi-date-picker';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [NgbMultiDatePicker,],
  exports: [NgbMultiDatePicker],
  entryComponents: [NgbMultiDatePicker],
  imports: [RouterModule,
    CommonModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbIconModule],
  providers: [DatePipe]
})
export class NgbMultiDatePickerModule { }

