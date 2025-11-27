import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

/**
 * Angular Application Configuration
 * Contains all providers and settings for the FluxForge application
 */
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideAnimations()],
};
