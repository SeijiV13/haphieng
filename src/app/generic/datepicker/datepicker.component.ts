import { Component, Input, forwardRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Validator, FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, } from '@angular/forms';
import { ValidationService} from '../services/validation.service';
import * as $ from "jquery";
import 'jqueryui';

const noop = () => {
};
@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    }
  ]
})
export class DatepickerComponent implements Validator, ControlValueAccessor, AfterViewInit {
  @Input() validations: any = [];
  @Input('placeholder') placeholder: string;
  @Input() id: string = "";
  @Input('dateFormat') dateFormat: string = 'mm/dd/yy';
  @Input() onModal: boolean = false;
  @Input() minimumDate: string;
  @Input() maximumDate: string;
  _value: any;
  @ViewChild('datepicker') datepicker: ElementRef;
  constructor(private validationService: ValidationService) { }

  ngAfterViewInit() {
    var self = this;
    //checks if datepicker is on modal
    this.checkOnModal(self)
    $('.datepicer-icon').on('click', '.btn', function (e) {
      $(e.delegateTarget).find("#" + self.id).focus();
    });
  }

  onChange: any = () => { };
  onTouched: any = () => { };
  //The inter



  //get accessor
  get value(): any {
    return this._value;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    this._value = v;
    this.onChange(v);
    this.onTouched();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  //gets the value of the datepicker on change
  getValue() {
    var date = $("#" + this.id).val();
    this.value = date;

  }
  public validate(c: FormControl) {
   // if(this.validations){
      for(let validation of this.validations){
          if(typeof this.validationService[validation] === 'function'){
              if(this.validationService[validation](c)){
                $("#" + this.id).addClass("ng-invalid");
                $("#" + this.id).removeClass("ng-valid");
                c.setErrors(this.validationService[validation](c))
              }else{
                $("#" + this.id).removeClass("ng-invalid");
                $("#" + this.id).addClass("ng-valid");
                c.setErrors(null);
              }
           
    
             }else{
               console.log("#"+this.id + " datepicker has an invalid validator");
             }
          }
        
    return c.errors;


  }

  public checkOnModal(self) {
    //checks if datepicker is on modal
    if (this.onModal) {
      $("#" + self.id).datepicker({
        maxDate: this.maximumDate,
        minDate: this.minimumDate,
        changeMonth: true,
        changeYear: true,
        dateFormat: this.dateFormat,
        onSelect: function (dateText, inst) {

          self.value = $(this).val();
        },
        beforeShow: function(input, inst){
          var rect = input.getBoundingClientRect();
          setTimeout(() => {
          inst.dpDiv.css({ top: rect.left + 40 , left: rect.left + 0  });
          }, 2)
          return inst;
        }

      }).addClass('datepicker-on-modal').keypress(function (e) { });
    }
    else {
      $("#" + self.id).datepicker({
        maxDate: this.maximumDate,
        minDate: this.minimumDate,
        changeMonth: true,
        changeYear: true,
        dateFormat: this.dateFormat,
        onSelect: function (dateText, inst) {
          self.value = $(this).val();
        }
      }).addClass('style-picker').keypress(function (e) { });
    }
  }
  addCss() {
    if(!this.onModal){
        $(".ui-datepicker").css('z-index', '999');
    }

  }
}
