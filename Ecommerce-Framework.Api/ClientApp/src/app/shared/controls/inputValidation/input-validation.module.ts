import { NgModule } from '@angular/core';
import { NgbInputValidation } from './input-validation';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [NgbInputValidation],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [NgbInputValidation]
})
export class NgbInputValidationModule {
}
