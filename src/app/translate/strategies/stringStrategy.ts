import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';

@Injectable()
export class StringStrategy implements ITranslateStrategy {
  private getRegExp = (index: number) => new RegExp(`{${index}(:s)?}`, 'gm');

  private isString = (value: any) => typeof value === 'string';

  public canApply(index: number, text: string, value: any): boolean {
    const regString = this.getRegExp(index);
    return regString.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    if (!this.isString(value)) {
      console.log(`TranslatePipe: value at position ${index} is not a string`);
      return text;
    }
    const regString = this.getRegExp(index);
    return text.replace(regString, value);
  }
}
