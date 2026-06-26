import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { provideTimeago, TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl } from 'ngx-timeago';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    importProvidersFrom(NgbModule),
    provideHttpClient(),
    provideTimeago({
      intl: { provide: TimeagoIntl },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }
    })
  ],
};
