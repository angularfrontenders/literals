import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';

@Injectable()
export class DataService {
  private readonly _baseUrl: string = 'http://localhost:3000';

  public constructor(
    @Inject(LOCALE_ID) private _locale: string,
    private _httpClient: HttpClient
  ) {}

  public getResources() {
    return this._httpClient.get(`${this._baseUrl}/${this._locale}`);
  }
}
