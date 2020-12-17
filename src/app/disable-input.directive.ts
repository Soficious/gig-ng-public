import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDisableInput]',
})
export class DisableInputDirective {
  private readonly debounceTime = 4000;

  /**
   * After the user activates the keyup event, the input will be disabled for a previously
   * selected time. With this, we avoid any input
   *
   * @param el ElementReference
   */
  public constructor(el: ElementRef) {
    el.nativeElement.addEventListener('keyup', (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      el.nativeElement.disabled = true;
      setTimeout(() => {
        el.nativeElement.disabled = false;
      }, this.debounceTime);
    });
  }
}
