import { NgModule } from '@angular/core';
import { NgbBreadcrumb } from './breadcrumb';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbIconModule } from '../icon/icon.module';

@NgModule({
  declarations: [NgbBreadcrumb],
  imports: [CommonModule, RouterModule, NgbIconModule],
  exports: [NgbBreadcrumb]
})
export class NgbBreadcrumbModule { }
