import { ViewCounterReceiptsModalComponent } from './view-counter-receipts-modal/view-counter-receipts-modal.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../web-services/customer.service';
import { SalesService } from '../../../web-services/sales.service';

@Component({
  selector: 'app-generate-counter-receipts',
  templateUrl: './generate-counter-receipts.component.html',
  styleUrls: ['./generate-counter-receipts.component.scss']
})
export class GenerateCounterReceiptsComponent implements OnInit {
  @ViewChild('viewReceiptsModal') viewReceiptsModal: ViewCounterReceiptsModalComponent;
  form: FormGroup;
  resultsHeaders = [
    "Ref No.",
    "Customer",
    "Description"
  ]
  resultsResults = [
  ];
  resultsKeys = [
  {name: 'refNo', behavior: 'clickable'},
  {name: 'customer_id'},
  {name: "description", filter: 'customer_id'}
  ]
    buttons = [
  ]
  customers: Array<any>;
  constructor(private formBuilder: FormBuilder, 
             private dataPasser: DataPasserService,
            private customerService: CustomerService,
            private salesService: SalesService) { }

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

  getDropdownValues(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
    })
  }

  getPostedSales(){
    this.salesService.getPostedSales().subscribe((data)=>{
      this.resultsResults = data;
    })
  }
  viewCounterReceipts(){
   this.viewReceiptsModal.show();
  }

}
