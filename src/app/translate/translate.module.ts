import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ResourcesModule } from '../resources/resources.module';

import { TranslatePipe } from './translate.pipe';
import * as strategies from './strategies/index';

@NgModule({
  declarations: [TranslatePipe],
  exports: [TranslatePipe],
  imports: [CommonModule, ResourcesModule],
  providers: [
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    strategies.CurrencyStrategy,
    strategies.DateStrategy,
    strategies.NumberStrategy,
    strategies.ResourceKeyStrategy,
    strategies.StringStrategy
  ]
})
export class TranslateModule {}
