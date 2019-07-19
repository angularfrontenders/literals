import { Injectable } from '@angular/core';

export interface ITextResource {
  notFound?: boolean;
  value?: string;
}

@Injectable()
export class ResourcesService {
  private dictionary: Map<string, string> = new Map([
    [
      'ACC.RESOURCE',
      'this is a test for {0:k} for date {1:d} with {2:c} in a {3:s}'
    ],
    ['ACC.ACCOUNTING', 'Accounting']
  ]);

  public constructor() {}

  public get(key: string): ITextResource {
    return {
      notFound: !this.dictionary.has(key),
      value: this.dictionary.get(key)
    };
  }
}
