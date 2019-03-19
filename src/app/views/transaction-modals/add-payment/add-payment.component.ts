import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AddCheckComponent } from '../add-check/add-check.component';
import { AddDiscountComponent } from '../add-discount/add-discount.component';
import { SalesService } from '../../../web-services/sales.service';
import { PurchaseService } from '../../../web-services/purchase.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';
import { DataPasserService } from '../../../generic/services/data-passer.service';

@Component({
  selector: 'add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent implements OnInit {
  @ViewChild('addPaymentModal') addPaymentModal: ModalDirective;
  @ViewChild('addCheckModal') addCheckModal: AddCheckComponent;
  @ViewChild('addDiscountModal') addDiscountModal: AddDiscountComponent;
  @ViewChild('returnTable') returnTable: GenericTableComponent;
  @ViewChild('tranTable') tranTable: GenericTableComponent;
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
    "Row No.",
    "Ref No.",
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
    {name: "rowNo"},
    {name: 'reference_number', objectname: 'attributes'},
    {name: 'date', objectname: 'attributes'},
    {name: "total", objectname: 'attributes'}
  ];
  tranResultsKeys: any[] = [
    {name: "rowNo"},
    {name: 'reference_number', objectname: 'attributes'},
    {name: 'terms', objectname: 'attributes'},
    {name: "total", objectname: 'attributes'}
  ];

  checkButtons: any[] = [
    {'name': "Add Check Payment", 'id': "check-button", 'logo': 'glyphicon glyphicon-file', 'type': 'add-check', 'behavior':'single'},

  ];

  discountButtons: any[] = [
    {'name': "Add Discount", 'id': "disc-button", 'logo': 'glyphicon glyphicon-file', 'type': 'add-discount', 'behavior':'single'},

  ];

  returnButtons: any[] = [];
  tranButtons: any[] = [];
  constructor(private formBuilder: FormBuilder,
              private salesService: SalesService,
              private purchaseService: PurchaseService,
              private dataPasserService: DataPasserService) { }

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
      cashPayment: ['0'],
      discount: [''],
      collectionTotal: [''],
      totalReturns: [''],
      balance: []
    })
  }

  setBalance(){
    if(this.dataPasserService.selectedData['customer']){
      this.summaryForm.controls['balance'].setValue(this.dataPasserService.selectedData['customer'].initial_balance)
    }
    if(this.dataPasserService.selectedData['supplier']){
      this.summaryForm.controls['balance'].setValue(this.dataPasserService.selectedData['supplier'].initial_balance)
    }
  }
  
  show(customer){
    this.setBalance();
    this.addPaymentModal.show();
    if(this.type == 'customer'){
      this.getSalesReturn(customer);
      this.getSales(customer);
      this
      this.returnHeaders = [
        "Row No.",
        "Ref No.",
        "Date",
        "Amount"
      ];
      this.returnResultsKeys = [
        {name: "rowNo"},
        {name: 'reference_number', objectname: 'attributes'},
        {name: 'date', objectname: 'attributes'},
        {name: "total", objectname: 'attributes'}
      ];
      this.tranHeaders = [
        "Row No.",
        "Ref No.",
        "Terms",
        "Amount"
      ];
      this.tranResultsKeys = [
        {name: "rowNo"},
        {name: 'reference_number', objectname: 'attributes'},
        {name: 'terms', objectname: 'attributes'},
        {name: "total", objectname: 'attributes'}
      ];
    
    }
    else if(this.type == 'supplier'){
      this.getPurchaseReturn(customer);
      this.getPurchase(customer);
      this.returnResultsKeys = [
        {name: "rowNo"},
        {name: 'reference_number', objectname: 'attributes'},
        {name: 'date', objectname: 'attributes'},
        {name: "total_peso", objectname: 'attributes'},
        {name: "total_yuan", objectname: 'attributes'}
      ];
      this.returnHeaders = [
        "Row No.",
        "Ref No.",
        "Total Peso",
        "Total Yuan"
      ];
      this.tranHeaders = [
        "Row No.",
        "Ref No.",
        "Terms",
        "Amount in Peso",
        "Amount in Yuan"
      ];
      this.tranResultsKeys = [
        {name: "rowNo"},
        {name: 'reference_number', objectname: 'attributes'},
        {name: 'terms', objectname: 'attributes'},
        {name: "total_peso", objectname: 'attributes'},
        {name: "total_yuan", objectname: 'attributes'},
      ];
    }
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
    this.computeValues();
  }

  removeDiscountRow(index){
    this.discountResults.splice(index, 1);
    this.computeValues();
  }

  addCollection(){
    
  }

  addCheck(check){
    this.checkResults.push(check);
    this.computeValues();
  }

  addDiscount(discount){
    this.discountResults.push(discount);
    this.computeValues();
  }

  getPurchase(supplier){
    this.tranTable.showLoader();
    this.purchaseService.getFilteredPurchase('', supplier.code, '', 'posted').subscribe((data)=>{
      this.tranResults = data.collection.data;
      this.tranTable.hideLoader();
    })
  }

  getPurchaseReturn(supplier){
    this.returnTable.showLoader();
    this.purchaseService.getFilteredPurchasesReturn('', supplier.code, '', '').subscribe((data)=>{
      this.returnResults = data.collection.data;
      this.returnTable.hideLoader();
    })
  }

  getSales(customer){
    this.tranTable.showLoader();
    this.salesService.getFilteredSales('', customer.code, '', 'posted').subscribe((data)=>{
      this.tranResults = data.collection.data;
      this.tranTable.hideLoader();
    })
 }

  getSalesReturn(customer){
     this.returnTable.showLoader();
     this.salesService.getFilteredSalesReturn('', customer.code, '', '').subscribe((data)=>{
       this.returnResults = data.collection.data;
       this.returnTable.hideLoader();
       let totalReturns = 0;
       for(let data of this.returnResults){
         totalReturns = totalReturns + parseFloat(data.attributes.total);
       }
       this.summaryForm.controls['totalReturns'].setValue(totalReturns);
     })
  }

  changeCashPayment(){
    this.computeValues();
  }

  computeValues(){
    let checkAmount = 0;
    let discountAmount = 0;
    let cashPayment = this.summaryForm.controls['cashPayment'].value;
    let collectionTotal = 0;
    for(let check of this.checkResults){
      let amount= check.amount.replace(/,/g, '');
      checkAmount = checkAmount + parseFloat(amount);
    }
    for(let discount of this.discountResults){
      let amount= discount.amount.replace(/,/g, '');
      discountAmount = discountAmount + parseFloat(amount);
    }
    this.summaryForm.controls['checksPayment'].setValue(checkAmount);
    this.summaryForm.controls['discount'].setValue(discountAmount);
    collectionTotal = checkAmount - discountAmount +  parseFloat(cashPayment.replace(/,/g, ''));
    this.summaryForm.controls['collectionTotal'].setValue(collectionTotal);
  }
}
