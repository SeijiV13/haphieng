import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  browseForm: FormGroup;
  @ViewChild('addCustomerModal') addCustomerModal: ModalDirective;
  constructor(private fb : FormBuilder) { }

  ngOnInit() {
    this.browseForm = this.fb.group({
      customerCode: [''],
      description: [''],
      address: [''],
      address2: [''],
      agent:[''],
      residentPhone: [''],
      telephone: [''],
      cellphone: [''],
      terms: [''],
      email : [''],
      fax: [''],
      tinNo: [''],
      contactPerson: [''],
      creditLimit:[''],
      initialBalance: [''],
      remaining: [''],
      customerType: [''],
      remarks: ['']


    })
  }

  show(){
    this.addCustomerModal.show();
  }
  hide(){
    this.addCustomerModal.hide();
  }

  addCustomer(){}


}
