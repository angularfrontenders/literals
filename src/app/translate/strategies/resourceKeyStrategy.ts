import { Injectable } from '@angular/core';
import { ITranslateStrategy } from './iTranslateStrategy';
import {
  ResourcesService,
  ITextResource
} from '../../resources/resources.service';

@Injectable()
export class ResourceKeyStrategy implements ITranslateStrategy {
  public constructor(private _resourcesService: ResourcesService) {}

  private getResource(value: string): string {
    const resource: ITextResource = this._resourcesService.get(value);
    return resource.notFound ? value : resource.value;
  }

  private getRegExp = (index: number) => new RegExp(`{${index}:k}`, 'gm');

  public canApply(index: number, text: string): boolean {
    const regKey = this.getRegExp(index);
    return regKey.test(text);
  }

  public apply(index: number, text: string, value: any): string {
    const regKey = this.getRegExp(index);
    return text.replace(regKey, this.getResource(value));
  }
}
