import { DateFormatDirective } from './date-format.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskDirective } from './mask.directive';
import { PipesModule } from '../pipes/pipes.module';
import { ValidationMessageDirective } from './validation-message.directive';
import { HasClaimDirective } from './has-claim.directive';
import { DecimalMaskDirective } from './decimal-mask.directive';
import { PesoMaskDirective } from './peso-mask.directive';
import { AlturaMaskDirective } from './altura-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [MaskDirective, DateFormatDirective, ValidationMessageDirective, HasClaimDirective, DecimalMaskDirective, PesoMaskDirective,AlturaMaskDirective],
  declarations: [MaskDirective, DateFormatDirective, ValidationMessageDirective, HasClaimDirective,DecimalMaskDirective, PesoMaskDirective,AlturaMaskDirective]
})

export class DirectivesModule {
}
