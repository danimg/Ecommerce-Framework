import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngb-link-workflow',
    template: `
    <a [attr.class]="className" [routerLink]="routerLink" >{{title}} </a>`
})
export class NgbLinkWorkFlow {
    @Input() title: string;
    @Input() className: string;
    @Input() routerLink: string;
    constructor() { }
}