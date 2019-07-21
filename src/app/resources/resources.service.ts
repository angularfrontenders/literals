import { Injectable } from '@angular/core';

import { DataService } from './data.service';

export interface ITextResource {
  key: string;
  value: string;
  notFound?: boolean;
}

@Injectable()
export class ResourcesService {
  private _dictionary: Array<ITextResource> = [];

  public constructor(private _dataService: DataService) {}

  public load() {
    this._dictionary = [];
    return new Promise((resolve, reject) => {
      this._dataService.getResources().subscribe(
        (resources: Array<ITextResource>) => {
          this._dictionary = resources;
          resolve(true);
        },
        err => {
          console.log('not server found. Get default resources...');
          this._dictionary = [
            {
              key: 'TITLE',
              value: 'Welcome to Literals!'
            },
            {
              key: 'HELLO.WORLD',
              value: 'Hello world!'
            },
            {
              key: 'FORMATS',
              value:
                'this is a formats test {0:k} -> string: {1}; date: {2:d}; currency: {3:c}; number: {4:n}'
            },
            { key: 'ANGULARFRONTENDERS', value: 'Angular Frontenders' }
          ];
          resolve(true);
        }
      );
    });
  }

  public get(key: string): ITextResource {
    const resourceFound = this._dictionary.find(
      (resource: ITextResource) => resource.key === key
    );

    return (
      resourceFound || {
        key: key,
        notFound: true,
        value: `[[resource: "${key}" not found!]]`
      }
    );
  }
}
