import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbLinkWorkFlow } from './linkWorkFlow';

@NgModule({
    declarations: [NgbLinkWorkFlow],
    imports: [CommonModule, RouterModule],
    exports: [NgbLinkWorkFlow]
})
export class NgbLinkWorkFlowModule { }
