import { AddSupplierComponent } from './../../transaction-modals/add-supplier/add-supplier.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-purchase-return-entries',
  templateUrl: './purchase-return-entries.component.html',
  styleUrls: ['./purchase-return-entries.component.scss']
})
export class PurchaseReturnEntriesComponent implements OnInit {

 
  @ViewChild('addSupplier') addSupplier: AddSupplierComponent;
  @ViewChild('addSalesEntry') addSalesEntry: AddSalesEntryComponent;
  @ViewChild('suspendedSales') suspendedSales: SuspendedSalesComponent;
  purchaseForm: FormGroup;
  resultsHeaders = [
    "Row No.",
    "Item code",
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
    this.dataPasserService.sendPageTitle("PURCHASE RETURN ENTRIES");
    this.purchaseForm = this.fb.group({
      refNo: ['', Validators.required],
      date: [''],
      currency: ['', Validators.required],
      supplier: ['', Validators.required],
      terms: [''],
      totalpeso: [{value:'', disabled: true}],
      totalyuan: [{value:'', disabled: true}]
    })
  }

  print(type: string){}

  addEntry(){
    this.addSalesEntry.show();
  }
  addNewSupplier(){
    this.addSupplier.show();
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
      
    }
  }

}
