import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';
import {
  ResourcesService,
  ITextResource
} from '../../resources/resources.service';

@Injectable()
export class ResourceKeyStrategy implements ITranslateStrategy {
  public constructor(private _resourcesService: ResourcesService) {}

  private getResource(key: string): string {
    const resource: ITextResource = this._resourcesService.get(key);
    return resource.notFound ? key : resource.value;
  }

  private getRegExp = (index: number) => new RegExp(`{${index}:k}`, 'gm');

  private isString = (value: any) => typeof value === 'string';

  public canApply(index: number, text: string, value: any): boolean {
    const regKey = this.getRegExp(index);
    return regKey.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    if (!this.isString(value)) {
      console.log(`TranslatePipe: value at position ${index} is not a string`);
      return text;
    }
    const regKey = this.getRegExp(index);
    return text.replace(regKey, this.getResource(value));
  }
}
