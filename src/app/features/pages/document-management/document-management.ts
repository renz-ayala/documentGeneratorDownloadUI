import { Component, computed, inject, input, signal } from '@angular/core';
import { DocumentService } from '../../../core/service/document-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemeService } from '../../../core/service/theme-service';
import { BtnLoading } from '../../../shared/directives/btn-loading';

@Component({
  selector: 'app-document-management',
  imports: [BtnLoading],
  templateUrl: './document-management.html',
})
export class DocumentManagement {
  sanitizer = inject(DomSanitizer);
  documentService = inject(DocumentService);
  themeService = inject(ThemeService);

  inputHtml = input('');
  htmlContent = signal('');

  isExporting = signal(false);

  safePreviewHtml = computed<SafeHtml>(() => {
    return this.sanitizer.bypassSecurityTrustHtml(this.htmlContent());
  });

  constructor() {
    this.htmlContent.set(this.inputHtml());
  }

  onContentChange(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.htmlContent.set(value);
  }

  exportDocument(format: 'pdf' | 'docx') {
    const content = '';

    if (!content) {
      return;
    }

    const apiUri$ =
      format === 'pdf'
        ? this.documentService.exportToPdf(content)
        : this.documentService.exportToPdf(content);

    apiUri$.subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {},
    });
  }
}
