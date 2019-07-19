import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';
import { CurrencyPipe } from '@angular/common';

@Injectable()
export class CurrencyStrategy implements ITranslateStrategy {
  public constructor(private _currencyPipe: CurrencyPipe) {}

  private getRegExp = (index: number) => new RegExp(`{${index}:c}`, 'gm');

  public canApply(index: number, text: string): boolean {
    const regCurrency = this.getRegExp(index);
    return regCurrency.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    const regCurrency = this.getRegExp(index);
    return text.replace(regCurrency, this._currencyPipe.transform(value));
  }
}
