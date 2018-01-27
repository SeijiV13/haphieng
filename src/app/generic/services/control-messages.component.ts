import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'control-messages',
  styles: [`.err-inline{
    font-size: 12px;
    margin-left: 2px;
    color: #9e0b0b !important;
    font-style: italic;
  }
  .err-center{
    width:81px;
    margin: 0px auto;
    color: #9e0b0b !important;
    font-style: italic;
  }
  `],
  template: `<div [class]="cssClass"  *ngIf="errorMessage"><span class="fa fa-times-circle" style="font-size:10px; color:red;"></span> {{errorMessage}}</div>`
})
export class ControlMessages implements OnChanges{
  @Input() control: FormControl;
  @Input() alignStyle: string;
  @Input('errorMessage') errMessage: string;
  cssClass:string = "err-inline";

  constructor() { }

  ngOnChanges(){
    if(this.alignStyle == "center"){
      this.cssClass = "err-inline err-center ";
    }else{
      this.cssClass = "err-inline";
    }
  }

  get errorMessage() {
    if (this.errMessage) {
      return this.errMessage;
    } else if (this.control) {
      for (let propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {

          return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
    }
    return null;
  }
}