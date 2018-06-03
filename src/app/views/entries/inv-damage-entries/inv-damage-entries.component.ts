import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../web-services/customer.service';
@Component({
  selector: 'app-inv-damage-entries',
  templateUrl: './inv-damage-entries.component.html',
  styleUrls: ['./inv-damage-entries.component.scss']
})
export class InvDamageEntriesComponent implements OnInit {
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
     {"name": "amount"}
  ];
    buttons = [
    {'name': "Post", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
    {'name': "Resume", 'id': "resume-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'resume', 'behavior':'single'},
    {'name': "Suspend", 'id': "suspend-button", 'logo': 'glyphicon glyphicon-download', 'type': 'suspend', 'behavior':'single'},
    {'name': "Item Transaction", 'id': "trans-button", 'logo': 'glyphicon glyphicon-file', 'type': 'itemtrans', 'behavior':'single'}
  ]
  customers: Array<any>;
  constructor(private dataPasserService: DataPasserService, 
              private fb: FormBuilder,
              private customerService: CustomerService) { 
                this.getDropdownValues();
              }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("IVENTORY DAMAGE ENTRY");
    this.salesForm = this.fb.group({
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
    this.addSalesEntry.show();
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
