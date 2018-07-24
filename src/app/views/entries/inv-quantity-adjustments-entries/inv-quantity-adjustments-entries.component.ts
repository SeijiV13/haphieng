import { ItemInOutModalComponent } from './../../transaction-modals/item-in-out-modal/item-in-out-modal.component';
import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';

@Component({
  selector: 'app-inv-quantity-adjustments-entries',
  templateUrl: './inv-quantity-adjustments-entries.component.html',
  styleUrls: ['./inv-quantity-adjustments-entries.component.scss']
})
export class InvQuantityAdjustmentsEntriesComponent implements OnInit {

  @ViewChild('itemInOutModal') itemInOutModal: ItemInOutModalComponent;
  @ViewChild('addCustomer') addCustomer: AddCustomerComponent;
  @ViewChild('addSalesEntry') addSalesEntry: AddSalesEntryComponent;
  @ViewChild('suspendedSales') suspendedSales: SuspendedSalesComponent;
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  salesForm: FormGroup;
  resultsHeaders = [
    "Row No.",
    "Category",
    "W1/W2",
    "Item code",
    "Qty New",
    "Qty Old",
    "Qty Diff",
    "Unit Cost",
    "Diff Amount",
    "New Amount",
    "Adjustment Remarks",
    "Item Remarks",
    "Remove"
  ]
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "category"},
     {"name": "warehouse"},
     {"name": "itemCode"},
     {"name":"qtyNew"},
     {"name": "qtyOld"},
     {"name": "qtyDiff"},
     {"name": "originalprice"},
     {"name": "diffAmount"},
     {"name": "newAmount"},
     {"name": "adjustmentRemarks"},
     {"name": "itemRemarks"}
  ];
    buttons = [
    {'name': "Post", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
    {'name': "Resume", 'id': "resume-button", 'logo': 'glyphicon glyphicon-pencil', 'type': 'resume', 'behavior':'single'},
    {'name': "Suspend", 'id': "suspend-button", 'logo': 'glyphicon glyphicon-download', 'type': 'suspend', 'behavior':'single'},
    {'name': "Item Transaction", 'id': "trans-button", 'logo': 'glyphicon glyphicon-file', 'type': 'itemtrans', 'behavior':'single'}
  ]
  constructor(private dataPasserService: DataPasserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("IVENTORY QUANTITY ADJUSTMENT ENTRY");
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
    let gross_price = entry['originalprice'];
    let newAmount =  parseFloat(gross_price) * parseFloat(entry['qtyNew']);
    //compute for amount
    entry['amount'] = newAmount;
    entry['newAmount'] = newAmount;
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
