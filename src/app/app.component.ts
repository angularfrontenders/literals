import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'literals';

  public constructor() {}

  public get values(): any {
    return ['ACC.ACCOUNTING', new Date(), 5000, 'fixed string'];
  }
}
