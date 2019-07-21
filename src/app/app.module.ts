import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, APP_INITIALIZER, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourcesModule } from './resources/resources.module';
import { TranslateModule } from './translate/translate.module';

import { ResourcesService } from './resources/resources.service';
import localeES from '@angular/common/locales/es';

registerLocaleData(localeES, 'es-ES');

export function resourcesProviderFactory(provider: ResourcesService) {
  return () => provider.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ResourcesModule, TranslateModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    {
      provide: APP_INITIALIZER,
      useFactory: resourcesProviderFactory,
      deps: [ResourcesService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
