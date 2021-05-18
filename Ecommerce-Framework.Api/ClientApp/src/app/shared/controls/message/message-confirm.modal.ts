import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alert-modal',
  template: `
  <div class="modal-header text-center">
    <h4 class="modal-title w-100">{{title}}</h4>
  </div>

  <div class="modal-body text-center">
    <div [innerHTML]="message"></div>
  </div>

  <div class="modal-footer">
  <button class="btn btn-success mr-1" type="button" (click)="onConfirm()">
      <ngb-icon name="check"></ngb-icon> Confirmar
    </button>

    <button class="btn btn-secondary mr-1" type="button" (click)="onClose()">
      <ngb-icon name="times"></ngb-icon> Fechar
    </button>
  </div>
`
})
export class NgbMessageConfirmModal {

  @Input() title: string;
  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) { }

  onConfirm() {
    this.activeModal.close(true);
  }

  onClose() {
    this.activeModal.close(false);
  }
}
