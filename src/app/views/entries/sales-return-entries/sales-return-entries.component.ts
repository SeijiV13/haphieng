import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sales-return-entries',
  templateUrl: './sales-return-entries.component.html',
  styleUrls: ['./sales-return-entries.component.scss']
})
export class SalesReturnEntriesComponent implements OnInit {
  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  @ViewChild('addCustomer') addCustomer: AddCustomerComponent;
  @ViewChild('addSalesEntry') addSalesEntry: AddSalesEntryComponent;
  @ViewChild('suspendedSales') suspendedSales: SuspendedSalesComponent;
  salesForm: FormGroup;
  resultsHeaders = [
    "Row No.",
    "Item code",
    "Good",
    "Quantity",
    "Quantity Stock",
    "Description",
    "W1/W2",
    "Agent",
    "Price",
    "Amount",
    "Remove"
  ]
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "itemCode"},
     {"name":"good"},
     {"name": "quantity"},
     {"name": "available"},
     {"name": "description"},
     {"name": "warehouse"},
     {"name": "agent"},
     {"name": "price"},
     {"name": "amount"},
     {"name": "remove", behavior: "clickable"}
  ];
    buttons = [
    {'name': "Post", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
    {'name': "Resume", 'id': "resume-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'resume', 'behavior':'single'},
    {'name': "Suspend", 'id': "suspend-button", 'logo': 'glyphicon glyphicon-download', 'type': 'suspend', 'behavior':'single'},
    {'name': "Item Transaction", 'id': "trans-button", 'logo': 'glyphicon glyphicon-file', 'type': 'itemtrans', 'behavior':'single'}
  ]
  constructor(private dataPasserService: DataPasserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("SALES RETURN ENTRIES");
    this.salesForm = this.fb.group({
      refNo: ['', Validators.required],
      date: [''],
      wcrc: ['', Validators.required],
      customer: ['', Validators.required],
      terms: [''],
      total: [{value:'', disabled: true}]
    })
  }

  print(type: string){

  }

  addEntry(){
    this.addSalesEntry.show();
  }
  addNewCustomer(){
    this.addCustomer.show();
  }

  pushNewItem(entry){
    //get price
    if(entry["lastprice"] !== entry['originalprice']){
      entry['price'] = entry['lastprice'];
    }else{
      entry['price'] = entry['originalprice'];
    }
    //compute for amount
    entry['amount'] = entry['price'] * entry ['quantity'];
    this.resultsResults.push(entry)
  }
  doAction(type){
    if(type === 'post'){

    }else if(type === 'resume'){
      this.suspendedSales.show();

    }else if(type === 'suspend'){


    }else if(type === 'itemtrans'){
      this.itemInOutModal.show();
      
    }
  }

}
