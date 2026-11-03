
/*
FILE: src/app/app.config.ts
WHAT: Application-wide Angular configuration.
WHY: Registers routing, HTTP, hydration and NgRx.
*/

import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

// NgRx
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Students state
import { studentsReducer } from './store/students.reducer';
import { StudentsEffects } from './store/students.effects';

export const appConfig: ApplicationConfig = {
  providers: [

    // Global error handling
    provideBrowserGlobalErrorListeners(),

    // Routing
    provideRouter(routes),

    // HTTP requests
    provideHttpClient(),

    // NgRx global store
    provideStore({
      students: studentsReducer
    }),

    // NgRx side effects
    provideEffects(StudentsEffects),

    // Angular hydration
    provideClientHydration(),
  ],
};
