import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { DocumentService } from '../../../core/service/document-service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemeService } from '../../../core/service/theme-service';
import { BtnLoading } from '../../../shared/directives/btn-loading';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-document-management',
  imports: [BtnLoading],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './document-management.html',
  styleUrls: ['../../../../styles.css'],
  encapsulation: ViewEncapsulation.None,
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
    effect(() => {
      this.htmlContent.set(this.inputHtml());
    });
  }

  onContentChange(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.htmlContent.set(value);
  }

  exportDocument(format: 'pdf' | 'docx') {
    const content = this.htmlContent();

    if (!content) {
      return;
    }

    this.isExporting.set(true);

    const apiUri$ =
      format === 'pdf'
        ? this.documentService.exportToPdf(content)
        : this.documentService.exportToDocx(content);

    apiUri$.pipe(finalize(() => this.isExporting.set(false))).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `document.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (e) => console.error('Unable to download document', e),
    });
  }
}
