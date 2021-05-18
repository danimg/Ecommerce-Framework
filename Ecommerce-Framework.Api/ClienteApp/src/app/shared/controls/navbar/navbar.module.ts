import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from "@angular/core";
import { NavBarControl } from "./navbar.control";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgbIconModule } from '../icon/icon.module';

@NgModule({
    declarations: [NavBarControl],
    exports: [NavBarControl],
    entryComponents: [NavBarControl],
    imports: [RouterModule,
        CommonModule,
        NgbDropdownModule,
        NgbIconModule]
})
export class NavBarControlModule { }
