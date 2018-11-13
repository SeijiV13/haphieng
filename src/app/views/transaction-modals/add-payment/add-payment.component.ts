import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddCheckComponent } from '../add-check/add-check.component';
import { AddDiscountComponent } from '../add-discount/add-discount.component';
import { SalesService } from '../../../web-services/sales.service';
import { PurchaseService } from '../../../web-services/purchase.service';

@Component({
  selector: 'add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  @ViewChild('addPaymentModal') addPaymentModal: ModalDirective;
  @ViewChild('addCheckModal') addCheckModal: AddCheckComponent;
  @ViewChild('addDiscountModal') addDiscountModal: AddDiscountComponent;
  @Input() type: string;
  paymentForm: FormGroup;
  summaryForm: FormGroup;

  checkHeaders: any[] = [
    "Row No.",
    "Check Date",
    "Type",
    "Account No.",
    "Bank",
    "Branch",
    "Check #",
    "Amount",
    "Days",
    "Remove",
  ];
  discountHeaders: any[] = [
    "Row No.",
    "Description",
    "Discount",
    "Remove"
  ];
  returnHeaders: any[] = [
    "Row No.",
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

  checkResultsKeys: any[] = [
    {name: 'rowNo'},
    {name: 'checkDate'},
    {name: 'type'},
    {name: 'accountNo'},
    {name: 'branch'},
    {name: 'bank'},
    {name: 'checkNo'},
    {name: 'amount'},
    {name: 'days'},
  ];
  discountResultsKeys: any[] = [
    {name: 'rowNo'},
    {name: 'description'},
    {name: 'amount'}
  ];
  returnResultsKeys: any[] = [
    "rowNo",
    "refNo",
    "date",
    "amount"
  ];
  tranResultsKeys: any[] = [];

  checkButtons: any[] = [
    {'name': "Add Check Payment", 'id': "check-button", 'logo': 'glyphicon glyphicon-file', 'type': 'add-check', 'behavior':'single'},

  ];

  discountButtons: any[] = [
    {'name': "Add Discount", 'id': "disc-button", 'logo': 'glyphicon glyphicon-file', 'type': 'add-discount', 'behavior':'single'},

  ];
  constructor(private formBuilder: FormBuilder,
              private salesService: SalesService,
              private purchaseService: PurchaseService) { }

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
  
  show(customer){
    this.addPaymentModal.show();
    if(this.type == 'customer')
    this.getSalesReturn(customer);
    else if(this.type == 'supplier')
    this.getPurchaseReturn(customer);
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

  removeCheckRow(index){
    this.checkResults.splice(index, 1);
  }

  removeDiscountRow(index){
    this.discountResults.splice(index, 1);
  }

  addCollection(){
    
  }

  addCheck(check){
    this.checkResults.push(check);
  }

  addDiscount(discount){
    this.discountResults.push(discount);
  }

  getPurchaseReturn(supplier){
    this.purchaseService.getFilteredPurchasesReturn('', supplier, '', '').subscribe((data)=>{
      this.returnResults = data;
    })
  }

  getSalesReturn(customer){
     this.salesService.getFilteredSalesReturn('', customer, '', '').subscribe((data)=>{
       this.returnResults = data;
     })
  }
}
