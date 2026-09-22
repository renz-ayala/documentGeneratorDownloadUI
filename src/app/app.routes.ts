import { Routes } from '@angular/router';
import { DocumentManagement } from './features/pages/document-management/document-management';

export const routes: Routes = [
  {
    path: '',
    component: DocumentManagement
  },
  {
    path: '**',
    redirectTo: '',
  }
];
