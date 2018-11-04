import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddCheckComponent } from '../add-check/add-check.component';
import { AddDiscountComponent } from '../add-discount/add-discount.component';

@Component({
  selector: 'add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  @ViewChild('addPaymentModal') addPaymentModal: ModalDirective;
  @ViewChild('addCheckModal') addCheckModal: AddCheckComponent;
  @ViewChild('addDiscountModal') addDiscountModal: AddDiscountComponent;
  paymentForm: FormGroup;
  summaryForm: FormGroup;

  checkHeaders: any[] = [
    "Check Date",
    "Type",
    "Account No.",
    "Bank",
    "Branch",
    "Check #",
    "Amount",
    "Days"
  ];
  discountHeaders: any[] = [
    "Description",
    "Discount",
  ];
  returnHeaders: any[] = [
    "Ref No.",
    "Date",
    "Amount"
  ];
  tranHeaders: any[] = [
    "Ref No.",
    "Date",
    "Terms",
    "Amount"
  ];

  checkResults: any[] = [];
  discountResults: any[] = [];
  returnResults: any[] = [];
  tranResults: any[] = [];

  checkResultsKeys: any[] = [];
  discountResultsKeys: any[] = [];
  returnResultsKeys: any[] = [];
  tranResultsKeys: any[] = [];

  checkButtons: any[] = [
    {'name': "Add Check Payment", 'id': "check-button", 'logo': 'glyphicon glyphicon-file', 'type': 'add-check', 'behavior':'single'},

  ]

  discountButtons: any[] = [
    {'name': "Add Discount", 'id': "disc-button", 'logo': 'glyphicon glyphicon-file', 'type': 'add-discount', 'behavior':'single'},

  ]
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paymentForm = this.initializeForm();
    this.summaryForm = this.initializeSummaryForm();
    this.disableFields();
    
  }

  disableFields(){
    this.summaryForm.controls['checksPayment'].disable();
    this.summaryForm.controls['totalReturns'].disable();
    this.summaryForm.controls['discount'].disable();
    this.summaryForm.controls['collectionTotal'].disable();
    this.summaryForm.controls['balance'].disable();

  }

  initializeForm(){
  return this.formBuilder.group({
    pr: [''],
    paymentDate: ['']
  });
  }

  initializeSummaryForm(){
    return this.formBuilder.group({
      checksPayment: [''],
      cashPayment: [''],
      discount: [''],
      collectionTotal: [''],
      totalReturns: [''],
      balance: ['']
    })
  }
  show(){
    this.addPaymentModal.show();
  }

  hide(){
    this.addPaymentModal.hide();
  }

  doAction(type){
    if(type == 'add-check'){
       this.addCheckModal.show();

    }else if(type == 'add-discount'){
      this.addDiscountModal.show();

    }
  }
}
