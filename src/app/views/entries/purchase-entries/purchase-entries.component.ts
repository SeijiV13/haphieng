import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { AddSupplierComponent } from './../../transaction-modals/add-supplier/add-supplier.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from '../../../web-services/supplier.service';

@Component({
  selector: 'app-purchase-entries',
  templateUrl: './purchase-entries.component.html',
  styleUrls: ['./purchase-entries.component.scss']
})
export class PurchaseEntriesComponent implements OnInit {
 @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
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
  ];
  suppliers: Array<any>;
  constructor(private dataPasserService: DataPasserService, 
             private fb: FormBuilder,
             private supplierService: SupplierService) {
               this.getDropdownValues();
              }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("PURCHASE ENTRIES");
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

  getDropdownValues(){
    this.supplierService.getSuppliers().subscribe((data)=>{
        this.suppliers = data;
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

    }else if(type === 'resume'){
      this.suspendedSales.show();

    }else if(type === 'suspend'){


    }else if(type === 'itemtrans'){
      this.itemInOutModal.show();
      
    }
  }

   removeRow(index){
    this.resultsResults.splice(index, 1);
    this.computeTotal();
  }
}
