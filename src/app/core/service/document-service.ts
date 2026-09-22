import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private readonly http = inject(HttpClient);

  private readonly urlBase = signal(environment.apiUrl);

  exportToPdf(htmlContent: string): Observable<Blob> {
    return this.http.post(`${this.urlBase()}/export/pdf`, { htmlContent }, { responseType: 'blob'});
  }

  exportToDocx(htmlContent: string): Observable<Blob> {
    return this.http.post(`${this.urlBase()}/export/docx`, { htmlContent }, { responseType: 'blob'});
  }
}
