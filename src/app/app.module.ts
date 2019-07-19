import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from './resources/resources.module';
import { TranslateModule } from './translate/translate.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ResourcesModule, TranslateModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
