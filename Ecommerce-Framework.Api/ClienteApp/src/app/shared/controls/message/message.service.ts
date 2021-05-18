import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbMessageAlertModal } from './message-alert.modal';
import { NgbMessageConfirmModal } from './message-confirm.modal';

@Injectable({ providedIn: 'root' })
export class NgbMessageService {

  constructor(private modal: NgbModal) { }

  alert(title: string, message: string, size: 'sm' | 'lg' | 'xl' = 'sm') {
    const modal = this.modal.open(NgbMessageAlertModal,
      {
        size: size, scrollable: true, backdrop: 'static', keyboard: false, centered: true
      });

    modal.componentInstance.title = title;
    modal.componentInstance.message = message;

    return modal.result;
  }

  confirm(title: string, message: string, size: 'sm' | 'lg' | 'xl' = 'sm') {
    const modal = this.modal.open(NgbMessageConfirmModal,
      {
        size: size, scrollable: true, backdrop: 'static', keyboard: false, centered: true
      });

    modal.componentInstance.title = title;
    modal.componentInstance.message = message;

    return modal.result;
  }
}
