import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {

  @ViewChild('addDiscountModal') addDiscountModal: ModalDirective;
  discountForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.discountForm = this.initializeForm();
  }

  initializeForm(){
    return this.formBuilder.group({
      description: [''],
      amount: [''],
    })
  }

  show(){
    this.addDiscountModal.show();
  }

  hide(){
    this.addDiscountModal.hide();
    
  }

  addDiscount(){
    
  }



}
