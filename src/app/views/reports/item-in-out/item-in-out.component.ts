import { SuspendedSalesComponent } from './../../transaction-modals/suspended-sales/suspended-sales.component';
import { AddSalesEntryComponent } from './../../transaction-modals/add-sales-entry/add-sales-entry.component';
import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-item-in-out',
  templateUrl: './item-in-out.component.html',
  styleUrls: ['./item-in-out.component.scss']
})
export class ItemInOutComponent implements OnInit {
  @Input('modal') modal: boolean = false;
  itemForm: FormGroup;
  resultsHeaders = [
    "Date",
    "Client",
    "Reference",
    "Price",
    "Currency",
    "Qunatity In",
    "Quantity Out",
    "Quantity Adj.",
    "Balance",
    "Agent"
  ]
  resultsResults = [];
  resultsKeys = [

  ];

  constructor(private dataPasserService: DataPasserService, private fb: FormBuilder) { }

  ngOnInit() {
    if(!this.modal){
    this.dataPasserService.sendPageTitle("ITEM-IN OUT TRANSACTIONS");
    }
    this.itemForm = this.fb.group({
      items: [''],
      clients: [''],
      allClients: [''],
      dateFrom: [''],
      dateTo: [''],
      totalIn: [{value: '', disabled: true}],
      totalOut: [{value: '', disabled: true}],
      totalAdj: [{value: '', disabled: true}],
      inOut: [{value: '', disabled: true}],
      recordQty: [{value: '', disabled: true}]
    })
  }

  print(){}

 filter(){}

 doAction(actionType){}

}
