import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngb-icon',
    template:`<fa-icon [icon]="name"></fa-icon>`
})
export class NgbIcon {
    @Input() name: string;
}