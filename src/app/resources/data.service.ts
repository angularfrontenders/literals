import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  private readonly _baseUrl: string = 'http://localhost:3000';

  public constructor(private _httpClient: HttpClient) {}

  public getResources() {
    return this._httpClient.get(`${this._baseUrl}/resources`);
  }
}
