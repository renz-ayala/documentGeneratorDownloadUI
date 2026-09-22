import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appBtnLoading]',
})
export class BtnLoading {
  el = inject(ElementRef<HTMLButtonElement>);

  appBtnLoading = input(false);

  constructor() {
    effect(() => {
      const isLoading = this.appBtnLoading();
      const button = this.el.nativeElement;

      button.disabled = isLoading;

      if (isLoading) {
        button.classList.add('btn-loading');
      } else {
        button.classList.remove('btn-loading');
      }
    });
  }
}
