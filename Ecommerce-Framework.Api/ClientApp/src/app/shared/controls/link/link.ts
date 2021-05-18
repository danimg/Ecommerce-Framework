import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngb-link',
    template: `
    <a [attr.class]="className" [routerLink]="routerLink">
        <ngb-icon [name]="iconName"></ngb-icon> {{title}}
    </a>
`
})
export class NgbLink {

    @Input() title: string;
    @Input() className: string;
    @Input() routerLink: string;
    @Input() iconName: string;
    constructor() { }
}