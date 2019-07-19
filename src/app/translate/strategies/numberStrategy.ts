import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';
import { DecimalPipe } from '@angular/common';

@Injectable()
export class NumberStrategy implements ITranslateStrategy {
  public constructor(private _decimalPipe: DecimalPipe) {}

  private getRegExp = (index: number) => new RegExp(`{${index}:n}`, 'gm');

  public canApply(index: number, text: string): boolean {
    const regNumber = this.getRegExp(index);
    return regNumber.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    const regNumber = this.getRegExp(index);
    return text.replace(regNumber, this._decimalPipe.transform(value));
  }
}
