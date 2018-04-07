import { ViewCounterReceiptsModalComponent } from './view-counter-receipts-modal/view-counter-receipts-modal.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-generate-counter-receipts',
  templateUrl: './generate-counter-receipts.component.html',
  styleUrls: ['./generate-counter-receipts.component.scss']
})
export class GenerateCounterReceiptsComponent implements OnInit {
  @ViewChild('viewReceiptsModal') viewReceiptsModal: ViewCounterReceiptsModalComponent;
  form: FormGroup;
  resultsHeaders = [
    "Customer",
    "Description"
  ]
  resultsResults = [
    {customerCode: "SHIN ZIN", description: "SHIN ZIN DESC" }
  ];
  resultsKeys = [
  {name: 'customerCode', behavior: 'clickable'},
  {name: "description"}
  ]
    buttons = [
  ]
  constructor(private formBuilder: FormBuilder, private dataPasser: DataPasserService) { }

  ngOnInit() {
    this.dataPasser.sendPageTitle("GENERATE SALES COUNTER RECEIPTS")
    this.form = this.formBuilder.group({
        counterReceiptNo: [''],
        counterDate: [''],
        dateFrom: [''],
        dateTo: [''],
        customer: ['']
    })
  }

  searchCustomer(){
  }
  viewCounterReceipts(){
   this.viewReceiptsModal.show();
  }

}