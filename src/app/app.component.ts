import { Component, OnInit } from '@angular/core';

import { ResourcesService } from './resources/resources.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'literals';

  public constructor(private _resourcesService: ResourcesService) {}

  public ngOnInit() {
    this._resourcesService.loadResources();
  }

  public get values(): Array<any> {
    return ['ACCOUNTING', new Date(), 5000, 'fixed string'];
  }
}
