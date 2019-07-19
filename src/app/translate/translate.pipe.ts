import { Pipe, PipeTransform } from '@angular/core';
import * as strategies from './strategies/index';

import {
  ResourcesService,
  ITextResource
} from '../resources/resources.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  private _strategies: Array<strategies.ITranslateStrategy> = [];

  public constructor(
    private _resourcesService: ResourcesService,
    private _stringStrategy: strategies.StringStrategy,
    private _resourceKeyStrategy: strategies.ResourceKeyStrategy,
    private _dateStrategy: strategies.DateStrategy,
    private _currencyStrategy: strategies.CurrencyStrategy,
    private _numberStrategy: strategies.NumberStrategy
  ) {
    this._strategies = [
      this._stringStrategy,
      this._resourceKeyStrategy,
      this._dateStrategy,
      this._currencyStrategy,
      this._numberStrategy
    ];
  }

  public transform(value: string, ...args: any[]): string {
    let returnedValue = this.getResource(value);
    returnedValue = this.format(returnedValue, args[0]);

    return returnedValue;
  }

  private getResource(value: string): string {
    const resource: ITextResource = this._resourcesService.get(value);
    return resource.notFound ? value : resource.value;
  }

  private format(value: string, args: any[]) {
    if (value) {
      (args || []).forEach((arg: any, index: number) => {
        const strategyFound: strategies.ITranslateStrategy = this._strategies.find(
          (strategy: strategies.ITranslateStrategy) => {
            return strategy.canApply(index, value);
          }
        );

        if (strategyFound) {
          value = strategyFound.apply(index, value, arg);
        }
      });
    }

    return value;
  }
}
