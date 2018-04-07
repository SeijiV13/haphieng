import { Component, Input, forwardRef, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Validator, FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, } from '@angular/forms';
import { ValidationService } from '../services/validation.service';
import * as $ from "jquery";
import 'jqueryui';

const noop = () => {
};
@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],

})
export class DatepickerComponent implements AfterViewInit {
  @Input() form: FormGroup;
  @Input() controlName: string;
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



  public checkOnModal(self) {
    //checks if datepicker is on modal
    if (this.onModal) {
      $("#" + self.id).datepicker({
        maxDate: this.maximumDate,
        minDate: this.minimumDate,
        changeMonth: true,
        changeYear: true,
        dateFormat: this.dateFormat,
        yearRange: "-300:+0", 
        onSelect: function (dateText, inst) {
          self.value = $(this).val();
          self.setValue(self.value);
        },
        beforeShow: function (input, inst) {
          var rect = input.getBoundingClientRect();
          setTimeout(() => {
            inst.dpDiv.css({ top: rect.left + 40, left: rect.left + 0 });
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
        yearRange: "-100:+0", 
        onSelect: function (dateText, inst) {
          self.value = $(this).val();
          self.setValue(self.value);
        }
      }).addClass('style-picker').keypress(function (e) { });
    }
  }

  setValue(value) {
    this.form.controls[this.controlName].setValue(value);

  }
  addCss() {
    if (!this.onModal) {
      $(".ui-datepicker").css('z-index', '999');
    }

  }
}