import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public constructor() {}

  public ngOnInit() {}

  public get values(): Array<any> {
    return ['ANGULARFRONTENDERS', 'fixed string', new Date(), 5000.5, 45.2];
  }
}
