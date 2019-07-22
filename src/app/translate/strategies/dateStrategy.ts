import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';
import { DatePipe } from '@angular/common';

interface IDateParameters {
  format?: string;
  timezone?: string;
  locale?: string;
}

@Injectable()
export class DateStrategy implements ITranslateStrategy {
  public constructor(private _datePipe: DatePipe) {}

  private getRegExp = (index: number) =>
    new RegExp(`{${index}:d(?<parameters>\\[.*\\])?}`, 'gm');
  private isDate = (value: any) =>
    Object.prototype.toString.call(value) === '[object Date]';

  public canApply(index: number, text: string, value: any): boolean {
    const regDate = this.getRegExp(index);
    return regDate.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    if (!this.isDate(value)) {
      console.log(
        `TranslatePipe: value at position ${index} is not a date object`
      );
      return text;
    }
    const dateParameters: IDateParameters = this.getParameters(index, text);
    const regDate = this.getRegExp(index);
    return text.replace(
      regDate,
      this._datePipe.transform(
        value,
        dateParameters.format,
        dateParameters.timezone,
        dateParameters.locale
      )
    );
  }

  private getParameters(index: number, text: string): IDateParameters {
    const dateParameters: IDateParameters = {
      format: 'mediumDate',
      timezone: undefined,
      locale: undefined
    };
    const parametersExp: RegExpExecArray = this.getRegExp(index).exec(text);
    if (!parametersExp || !parametersExp.groups.parameters) {
      return dateParameters;
    }
    //
    const parameters: string = parametersExp.groups.parameters.replace(
      /[\[\]']+/g,
      ''
    );

    // Get format
    const regFormatExp: RegExpExecArray = /f(ormat)?:(?<format>([^;])*)/.exec(
      parameters
    );
    if (regFormatExp && regFormatExp.groups.format) {
      dateParameters.format = regFormatExp.groups.format;
    }
    // Get timezone
    const regTimezoneExp: RegExpExecArray = /t(imezone)?:(?<timezone>([^;])*)/.exec(
      parameters
    );
    if (regTimezoneExp && regTimezoneExp.groups.timezone) {
      dateParameters.timezone = regTimezoneExp.groups.timezone;
    }
    // Get locale
    const regLocaleExp: RegExpExecArray = /l(ocale)?:(?<locale>([^;])*)/.exec(
      parameters
    );
    if (regLocaleExp && regLocaleExp.groups.locale) {
      dateParameters.locale = regLocaleExp.groups.locale;
    }
    return dateParameters;
  }
}
