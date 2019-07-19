import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';

@Injectable()
export class StringStrategy implements ITranslateStrategy {
  private getRegExp = (index: number) => new RegExp(`{${index}(:s)?}`, 'gm');

  public canApply(index: number, text: string): boolean {
    const regString = this.getRegExp(index);
    return regString.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    const regString = this.getRegExp(index);
    return text.replace(regString, value);
  }
}
