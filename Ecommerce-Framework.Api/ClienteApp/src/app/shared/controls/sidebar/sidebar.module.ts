import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SidebarControl } from './sidebar.control';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbIconModule } from "../icon/icon.module";

@NgModule({
    declarations: [SidebarControl],
    exports: [SidebarControl],
    entryComponents: [SidebarControl],
    imports: [
        RouterModule,
        CommonModule,
        NgbCollapseModule,
        NgbIconModule]
})
export class SidebarControlModule { }
