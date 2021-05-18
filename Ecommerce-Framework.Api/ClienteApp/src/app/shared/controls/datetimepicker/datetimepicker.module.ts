import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbIconModule } from '../icon/icon.module';
import { NgbDateTimePicker } from './datetimepicker';

@NgModule({
  declarations: [NgbDateTimePicker],
  imports: [FormsModule, CommonModule, NgbModule, NgbIconModule],
  exports: [NgbDateTimePicker]
})
export class NgbDateTimePickerModule { }
