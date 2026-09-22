import { Injectable, signal } from '@angular/core';

export interface ThemeOption {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themes: ThemeOption[] = [
    { id: 'black', label: 'Dark' },
    { id: 'light', label: 'Light' },
  ];

  currentTheme = signal(document.documentElement.getAttribute('data-theme') || 'black');

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme.set(theme);
  }
}
