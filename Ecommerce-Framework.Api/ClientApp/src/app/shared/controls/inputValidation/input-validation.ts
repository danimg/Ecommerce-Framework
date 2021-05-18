import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'ngb-inputvalidation',
    templateUrl: 'input-validation.html',
    styleUrls: ['input-validation.scss']
})
// tslint:disable-next-line: component-class-suffix
export class NgbInputValidation {
    @Input() form: FormGroup;
    @Input() controlName: string;
    @Input() messages: [];
}
