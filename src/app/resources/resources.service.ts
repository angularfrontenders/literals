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

  public loadResources(): void {
    this._dictionary = [];
    this._dataService.getResources().subscribe(
      (resources: Array<ITextResource>) => {
        this._dictionary = resources;
      },
      err => {
        console.log('not server found. Get default resources...');
        this._dictionary = [
          {
            key: 'EXAMPLE',
            value:
              'this is a test for {0:k} for date {1:d} with {2:c} in a {3:s}'
          },
          { key: 'ACCOUNTING', value: 'Accounting' }
        ];
      }
    );
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
