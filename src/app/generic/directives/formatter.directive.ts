import { Directive, ElementRef, HostListener, AfterViewInit, HostBinding, Input, Renderer } from '@angular/core';
import { FormatterService } from '../services/formatter.service';

@Directive({
  selector: '[Formatter]'
})
export class FormatterDirective implements AfterViewInit {
  @Input('Formatter') attributes: string;
  parsedAttributes: any;
  //keyDown: boolean = false;
  keysDown = {};

  constructor(private el: ElementRef, private renderer: Renderer, private format: FormatterService) { }

  ngAfterViewInit() {
    this.parsedAttributes = JSON.parse(this.attributes);
    if (this.parsedAttributes.type == "currency" ||
      this.parsedAttributes.type == "number" ||
      this.parsedAttributes.type === "numberDecimal" || 
      this.parsedAttributes.type == "decimal")
      this.renderer.setElementClass(this.el.nativeElement, 'amount', true);
      
    if(this.parsedAttributes.type == "currency" ||
       this.parsedAttributes.type === "numberDecimal" || 
            this.parsedAttributes.type == "decimal")
      this.renderer.setElementProperty(this.el.nativeElement, 'placeholder', '0.00');
    else if(this.parsedAttributes.type == "number")
      this.renderer.setElementProperty(this.el.nativeElement, 'placeholder', '0');
  }

  /*@HostListener('keydown', ['$event']) 
  onkeydown(event: KeyboardEvent) {
    if(this.keysDown[event.keyCode]){
      event.preventDefault();
    }else{
      this.keysDown[event.keyCode] = true;
    }
  }

  @HostListener('keyup', ['$event']) 
  onkeyup(event: KeyboardEvent) {
    delete this.keysDown[event.keyCode];
  }*/

  @HostListener('keypress', ['$event']) 
  onkeypress(event: KeyboardEvent) {
    let key:any;
    if(!key) key = event.which;
    /*if(!key) key = event.keyCode; 
    if(!key) key = event.key;
    if(!key) key = event.charCode;*/

    if (
        this.parsedAttributes.type === "number" || 
        this.parsedAttributes.type === "year") {
      if(key == 9)
        return true;
      if(key < 48 || key > 57){
				event.preventDefault();
				return false;
			}
    }
    else if (this.parsedAttributes.type === "currency" ||
        this.parsedAttributes.type === "numberDecimal" || 
        this.parsedAttributes.type === "decimal" 
        ) {
          let value = this.el.nativeElement.value;
        if(key == 9)
          return true;
          
        if(value.indexOf('.') > -1	&& key == 46 ){
          event.preventDefault();
          return false;
        }
			
        if(value == '' && key == 46){
          this.el.nativeElement.value = 0;
          return true;
        }
			
        if((navigator.userAgent.search("MSIE") > -1 && key == 0)/*For delete*/ 
          || (navigator.userAgent.search("Firefox") > -1 && key == 0)/*For delete, left arrow, right arrow*/ 
          || (navigator.userAgent.search("Firefox") > -1  && key == 8)/*For backspace*/ 
          || key == 46)
            return true;
          
        if(key < 48 || key > 57){
          event.preventDefault();
          return false;
        }
    }
  }

  @HostListener('blur') onblur() {

    if (this.parsedAttributes.type === "recommendation") {
      //console.log(this.el.nativeElement.value);
      this.el.nativeElement.value = this.format.FormatRecommendation(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === "currency") {
      //console.log(this.el.nativeElement.value);
      this.el.nativeElement.value = this.format.FormatCurrency(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === "contact") {
      this.el.nativeElement.value = this.format.FormatContactNumber(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === "number") {
      this.el.nativeElement.value = this.format.FormatNumber(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === "date") {
      this.el.nativeElement.value = this.format.FormatDate(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === "year") {
      this.el.nativeElement.value = this.format.FormatYear(this.el.nativeElement.value);
    }

    if (this.parsedAttributes.type === "page") {
      this.el.nativeElement.value = this.format.FormatPage(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === "numberDecimal") {
      this.el.nativeElement.value = this.format.FormatNumberWithDecimal(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === "decimal") {
      this.el.nativeElement.value = this.format.FormatDecimal(this.el.nativeElement.value);
    }
    if (this.parsedAttributes.type === 'tct') {
      this.el.nativeElement.value = this.format.tctFormat(this.el.nativeElement.value);
    }
    let event: Event = document.createEvent("Event");
    event.initEvent('input', true, true);
    Object.defineProperty(event, 'target', { value: this.el.nativeElement, enumerable: true });
    this.renderer.invokeElementMethod(this.el.nativeElement, 'dispatchEvent', [event]);
  }

}
