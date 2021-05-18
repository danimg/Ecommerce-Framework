import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbTable, NgbTableFilterBy } from './table';
import { NgbdSortableHeader } from './NgbdSortableHeader';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from './../../pipes/pipes.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbIconModule } from '../icon/icon.module';
import { DirectivesModule } from '../../directives/directives.module';
// import { ResizeObserverDirective } from './ResizeObserverDirective';

@NgModule({
  // declarations: [NgbTable, NgbdSortableHeader, NgbTableFilterBy, ResizeObserverDirective],
  declarations: [NgbTable, NgbdSortableHeader, NgbTableFilterBy],
  entryComponents: [NgbTableFilterBy],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbModalModule,
    NgbIconModule,
    PipesModule,
    NgbDropdownModule,
    DirectivesModule
  ],
  exports: [NgbTable]
})
export class NgbTableModule { }
