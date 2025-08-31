import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({ "projectId": "simple-crm-952ac", "appId": "1:734865068519:web:bf7681c7517741f85bed42", "storageBucket": "simple-crm-952ac.firebasestorage.app", "apiKey": "AIzaSyDmvvwgR2Gy-bmVuxN931D1AXOwETyVwSE", "authDomain": "simple-crm-952ac.firebaseapp.com", "messagingSenderId": "734865068519" }))),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};