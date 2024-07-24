import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { IKanjiapi } from './Services/Interfaces/ikanjiapi.service';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';
import { KanjiapiService } from './Services/Implementations/kanjiapi.service';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withHashLocation()), provideAnimationsAsync(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
        { provide: IKanjiapi, useClass: KanjiapiService }]
};
