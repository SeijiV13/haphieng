import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { AddSupplierComponent } from './../../transaction-modals/add-supplier/add-supplier.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../../web-services/supplier.service';
import { PurchaseService } from '../../../web-services/purchase.service';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
import { FormErrorHandlerService } from '../../../generic/services/form-error-handler.service';

@Component({
  selector: 'app-purchase-return-entries',
  templateUrl: './purchase-return-entries.component.html',
  styleUrls: ['./purchase-return-entries.component.scss']
})
export class PurchaseReturnEntriesComponent implements OnInit {
  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  @ViewChild('addSupplier') addSupplier: AddSupplierComponent;
  @ViewChild('addSalesEntry') addSalesEntry: AddSalesEntryComponent;
  @ViewChild('suspendedSales') suspendedSales: SuspendedSalesComponent;
  @ViewChild('infoModalSuspend') infoModalSuspend: GenericModalComponent;
  @ViewChild('infoModalPost') infoModalPost: GenericModalComponent;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  purchaseForm: FormGroup;
  resultsHeaders = [
    "Row No.",
    "Item code",
    "Good",
    "Quantity",
    "Quantity Stock",
    "Description",
    "W1/W1",
    "Price",
    "Amount",
    "Remove"
  ]
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "itemCode"},
     {"name": "good"},
     {"name": "quantity"},
     {"name": "available"},
     {"name": "description"},
     {"name": "warehouse"},
     {"name": "price"},
     {"name": "amount"},
  ];
    buttons = [
    {'name': "Post", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
    {'name': "Resume", 'id': "resume-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'resume', 'behavior':'single'},
    {'name': "Suspend", 'id': "suspend-button", 'logo': 'glyphicon glyphicon-download', 'type': 'suspend', 'behavior':'single'},
    {'name': "Item Transaction", 'id': "trans-button", 'logo': 'glyphicon glyphicon-file', 'type': 'itemtrans', 'behavior':'single'}
  ]
  suppliers: Array<any>;
  retrievedSale:boolean = false;
  constructor(private dataPasserService: DataPasserService, 
              private fb: FormBuilder,
              private supplierService: SupplierService,
              private purchaseService: PurchaseService,
              private formErrorHandler: FormErrorHandlerService) {
                this.getDropdownValues();
               }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("PURCHASE RETURN ENTRY");
    this.purchaseForm = this.fb.group({
      id: [''],
      refNo: ['', Validators.required],
      date: [''],
      currency: ['', Validators.required],
      supplier: ['', Validators.required],
      terms: [''],
      totalpeso: [{value:'', disabled: true}],
      totalyuan: [{value:'', disabled: true}]
    })
  }
  getDropdownValues(){
    this.supplierService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
    })
  }

  print(type: string){}

  addEntry(){
    if(!this.purchaseForm.controls['supplier'].value){
      this.errorModal.showWithCustomMessage("Please select a customer");
      this.purchaseForm.controls['supplier'].setErrors(Validators.required);
    }else{
      this.addSalesEntry.show(this.purchaseForm.controls['supplier'].value);
    }
  }
  addNewSupplier(){
    this.addSupplier.show();
  }


  pushNewItem(entry){
    //get price 
    let lastprice = parseFloat(entry['lastprice'])
    let originalprice = parseFloat(entry['originalprice']);
    if(lastprice){
      entry['price'] = lastprice;
    }else{
      entry['price'] = originalprice;
    }
    //compute for amount
    entry['amount'] = parseFloat(entry['price']) * parseFloat(entry['quantity']);
    this.resultsResults.push(entry);
    this.computeTotal();
  }

  computeTotal(){
    let total = 0
    for(let result of this.resultsResults){
      total = total + result.amount;
    }
    this.purchaseForm.controls['totalpeso'].setValue(total);
    this.purchaseForm.controls['totalyuan'].setValue(total / 8.13)
  }


  doAction(type){
    if(type === 'post'){
      this.infoModalPost.showWithCustomMessage('Are you sure you want to post the transaction?');
    }else if(type === 'resume'){
      this.suspendedSales.show();

    }else if(type === 'suspend'){
      this.infoModalSuspend.showWithCustomMessage('Are you sure you want to suspend the transaction?');
    }else if(type === 'itemtrans'){
      this.itemInOutModal.show();
      
    }
  }

  postTransaction(){
    if (!this.purchaseForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.purchaseForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let purchase = this.createPurchaseReturnJson('posted');
          this.purchaseService.createPurchaseReturn(purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let purchase = this.createPurchaseReturnJson('posted');
          this.purchaseService.editPurchaseReturn(this.purchaseForm.controls['id'].value,purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.purchaseForm.controls['refNo'].enable();
      }
     }
  
  }

  suspendTransaction(){
    if (!this.purchaseForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.purchaseForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let purchase = this.createPurchaseReturnJson('suspend');
          this.purchaseService.createPurchaseReturn(purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let purchase = this.createPurchaseReturnJson('suspend');
          this.purchaseService.editPurchaseReturn(this.purchaseForm.controls['id'].value, purchase).subscribe((data)=>{
            this.purchaseForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.purchaseForm.controls['refNo'].enable();
       }
     }
    

  }

  retrieveSuspendedPurchase(purchase){
    this.purchaseForm.controls['id'].setValue(purchase.id);
    this.purchaseForm.controls['currency'].setValue(purchase.currency);
    this.purchaseForm.controls['date'].setValue(purchase.date);
    this.purchaseForm.controls['refNo'].setValue(purchase.reference_number);
    this.purchaseForm.controls['terms'].setValue(purchase.terms);
    this.purchaseForm.controls['totalpeso'].setValue(purchase.total_peso);
    this.purchaseForm.controls['totalyuan'].setValue(purchase.total_yuan);
    this.purchaseForm.controls['supplier'].setValue(purchase.supplier_id);


    this.retrievedSale = true;
    this.purchaseForm.controls['refNo'].disable();
  }

  createPurchaseReturnJson(status){
    let json = {
      currency: this.purchaseForm.controls['currency'].value,
      date: this.purchaseForm.controls['date'].value,
      status: status,
      reference_number: this.purchaseForm.controls['refNo'].value,
      terms: this.purchaseForm.controls['terms'].value,
      total_peso: this.purchaseForm.controls['totalpeso'].value,
      total_yuan: this.purchaseForm.controls['totalyuan'].value,
      supplier_id: this.purchaseForm.controls['supplier'].value,
      product_purchase_returns: [
      ]
    }

    for(let item of this.resultsResults){
      let jsonPurchase = {
        good: item.good,
        quantity: item.quantity,
        warehouse_source: item.warehouse == "W2" ? 'warehouse_2_stock': 'warehouse_1_stock',
        override_price: item.price,
        product: item.itemCode
      }
      json.product_purchase_returns.push({jsonPurchase})
    }



    return json;
  }
  

   removeRow(index){
    this.resultsResults.splice(index, 1);
    this.computeTotal();
  }

}
