import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(RouterModule.forRoot(routes)),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  ]
};
