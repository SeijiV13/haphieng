import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../web-services/customer.service';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
import { SalesService } from '../../../web-services/sales.service';
import { FormErrorHandlerService } from '../../../generic/services/form-error-handler.service';

@Component({
  selector: 'app-sales-entries',
  templateUrl: './sales-entries.component.html',
  styleUrls: ['./sales-entries.component.scss']
})
export class SalesEntriesComponent implements OnInit {
  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  @ViewChild('addCustomer') addCustomer: AddCustomerComponent;
  @ViewChild('addSalesEntry') addSalesEntry: AddSalesEntryComponent;
  @ViewChild('suspendedSales') suspendedSales: SuspendedSalesComponent;
  @ViewChild('infoModalSuspend') infoModalSuspend: GenericModalComponent;
  @ViewChild('infoModalPost') infoModalPost: GenericModalComponent;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  salesForm: FormGroup;
  resultsHeaders = [
    "Row No.",
    "Item code",
    "Description",
    "Warehouse",
    "Quantity",
    "Quantity Stock",
    "Pending Quantity",
    "Agent",
    "Price",
    "Amount",
    "Remove"
  ]
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "itemCode"},
     {"name":"description"},
     {"name": "warehouse"},
     {"name": "quantity"},
     {"name": "available"},
     {"name": "pending"},
     {"name": "agent"},
     {"name": "price"},
     {"name": "amount"},
  ];
    buttons = [
    {'name': "Post", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
    {'name': "Resume", 'id': "resume-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'resume', 'behavior':'single'},
    {'name': "Suspend", 'id': "suspend-button", 'logo': 'glyphicon glyphicon-download', 'type': 'suspend', 'behavior':'single'},
    {'name': "Item Transaction", 'id': "trans-button", 'logo': 'glyphicon glyphicon-file', 'type': 'itemtrans', 'behavior':'single'}
  ];
  retrievedSale: boolean = false;

  customers : Array<any>;
  constructor(private dataPasserService: DataPasserService, 
              private fb: FormBuilder,
              private customerService: CustomerService,
              private salesService: SalesService,
              private formErrorHandler: FormErrorHandlerService) { 
                this.getDropdownValues();
              }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("SALES ENTRY");
    this.salesForm = this.fb.group({
      id: [''],
      refNo: ['', Validators.required],
      date: [''],
      wcrc: ['', Validators.required],
      customer: ['', Validators.required],
      terms: [''],
      total: [{value:'', disabled: true}]
    })
  }

  getDropdownValues(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    })

  }
  print(type: string){

  }

  addEntry(){
    if(!this.salesForm.controls['customer'].value){
      this.errorModal.showWithCustomMessage("Please select a customer");
      this.salesForm.controls['customer'].setErrors(Validators.required);
    }else{
      this.addSalesEntry.show(this.salesForm.controls['customer'].value);
    }
  }
  addNewCustomer(){
    this.addCustomer.show();
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
    this.salesForm.controls['total'].setValue(total);
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
    if (!this.salesForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.salesForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let sale = this.createSaleJson('posted');
          this.salesService.createSale(sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let sale = this.createSaleJson('posted');
          this.salesService.editSale(this.salesForm.controls['id'].value,sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.salesForm.controls['refNo'].enable();
      }
     }
  
  }

  suspendTransaction(){
    if (!this.salesForm.valid) {
      this.errorModal.messageKey = 'acceptError';
      this.errorModal.show();
      this.formErrorHandler.markFormDirty(this.salesForm);
         
     }else{
      if(this.resultsResults.length == 0){
        this.errorModal.showWithCustomMessage('There are no items selected');

      }else{
        if(!this.retrievedSale){
          let sale = this.createSaleJson('suspend');
          this.salesService.createSale(sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.retrievedSale = false;
            this.infoModalPost.hide();
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }else{
          let sale = this.createSaleJson('suspend');
          this.salesService.editSale(this.salesForm.controls['id'].value,sale).subscribe((data)=>{
            this.salesForm.reset();
            this.resultsResults = [];
            this.infoModalPost.hide();
            this.retrievedSale = false;
          }, error => this.dataPasserService.sendError(error.errors[0]));
        }
        this.salesForm.controls['refNo'].enable();
       }
     }
    

  }

  retrieveSuspendedSale(sales){
    this.salesForm.controls['id'].setValue(sales.id);
    this.salesForm.controls['date'].setValue(sales.date);
    this.salesForm.controls['refNo'].setValue(sales.reference_number);
    this.salesForm.controls['terms'].setValue(sales.terms);
    this.salesForm.controls['total'].setValue(sales.total);
    this.salesForm.controls['wcrc'].setValue(sales.sale_type);
    this.salesForm.controls['customer'].setValue(sales.customer_id);
    this.retrievedSale = true;
    this.salesForm.controls['refNo'].disable();
  }

  createSaleJson(status){
    let json = {
      date: this.salesForm.controls['date'].value,
      reference_number: this.salesForm.controls['refNo'].value,
      status: status,
      terms:this.salesForm.controls['terms'].value,
      total: this.salesForm.controls['total'].value,
      sale_type: this.salesForm.controls['wcrc'].value,
      customer_id: this.salesForm.controls['customer'].value,
      product_sales: [
      ]
    }

    for(let item of this.resultsResults){
      let jsonSale = {
        quantity: item.quantity,
        warehouse_source: item.warehouse == "W2" ? 'warehouse_2_stock': 'warehouse_1_stock',
        override_price: item.price,
        agent: item.agent,
        product: item.itemCode
      }
      json.product_sales.push({jsonSale})
    }



    return json;
  }
  
  removeRow(index){
    this.resultsResults.splice(index, 1);
    this.computeTotal();
  }


}
