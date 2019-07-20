import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';
import { CurrencyPipe } from '@angular/common';

@Injectable()
export class CurrencyStrategy implements ITranslateStrategy {
  public constructor(private _currencyPipe: CurrencyPipe) {}

  private getRegExp = (index: number) => new RegExp(`{${index}:c}`, 'gm');
  private isNumber = (value: any) => typeof value === 'number';

  public canApply(index: number, text: string, value: any): boolean {
    const regCurrency = this.getRegExp(index);
    return regCurrency.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    if (!this.isNumber(value)) {
      console.log(`TranslatePipe: value at position ${index} is not a number`);
      return text;
    }
    const regCurrency = this.getRegExp(index);
    return text.replace(regCurrency, this._currencyPipe.transform(value));
  }
}
