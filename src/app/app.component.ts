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
    return ['ANGULARFRONTENDERS', 'fixed string', 5, new Date(), 5000.5, 45.2];
  }
}
