import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[Trimmer]'
})
export class TrimmerDirective {

  constructor(private el: ElementRef) { }
  @HostListener('keyup') onKeyUp() {
    this.el.nativeElement.value = this.el.nativeElement.value.trim();
  }
}
