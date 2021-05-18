import { NgModule } from '@angular/core';

import { NgbIconModule } from '../icon/icon.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbMessageService } from './message.service';

import { NgbMessageAlertModal } from './message-alert.modal';
import { NgbMessageConfirmModal } from './message-confirm.modal';

@NgModule({
  declarations: [NgbMessageAlertModal, NgbMessageConfirmModal],
  entryComponents: [NgbMessageAlertModal, NgbMessageConfirmModal],
  imports: [NgbIconModule, NgbModalModule],
  providers: [NgbMessageService]
})

export class NgbMessageModule { }
