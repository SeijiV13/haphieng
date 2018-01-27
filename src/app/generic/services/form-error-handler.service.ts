import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
@Injectable()
export class FormErrorHandlerService {

  constructor() { }

  markFormDirty(form: FormGroup) {
    Object.keys(form.controls).forEach(key => {
      if (form.controls[key] instanceof FormGroup) {
        this.markFormDirty(<FormGroup>form.controls[key]);
      } else if (form.controls[key] instanceof FormArray) {
        this.markFormDirty(<FormGroup>form.controls[key]);
      }
      else {
        form.get(key).markAsTouched();
      }
    })
  }

  markGroupDirty(group: FormGroup) {
    Object.keys(group.controls).forEach(key => {
      group.get(key).markAsTouched();
    })
  }

}
