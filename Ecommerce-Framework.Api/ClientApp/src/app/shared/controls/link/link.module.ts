import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbIconModule } from '../icon/icon.module';
import { NgbLink } from './link';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [NgbLink],
    imports: [CommonModule, NgbIconModule, RouterModule],
    exports: [NgbLink]
})
export class NgbLinkModule {
}
