import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';
import { DatePipe } from '@angular/common';

@Injectable()
export class DateStrategy implements ITranslateStrategy {
  private readonly _format: string = 'dd/MM/yyyy';
  public constructor(private _datePipe: DatePipe) {}

  private getRegExp = (index: number) => new RegExp(`{${index}:d}`, 'gm');

  public canApply(index: number, text: string): boolean {
    const regDate = this.getRegExp(index);
    return regDate.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    const regDate = this.getRegExp(index);
    return text.replace(regDate, this._datePipe.transform(value, this._format));
  }
}
