import { ViewReceiptItemsModalComponent } from './view-receipt-items-modal/view-receipt-items-modal.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesService } from '../../../web-services/sales.service';

@Component({
  selector: 'app-view-edit-counter-receipts',
  templateUrl: './view-edit-counter-receipts.component.html',
  styleUrls: ['./view-edit-counter-receipts.component.scss']
})
export class ViewEditCounterReceiptsComponent implements OnInit {
  @ViewChild ("viewReceiptItemsModal") viewReceiptItemsModal: ViewReceiptItemsModalComponent;
  constructor(private dataPasser: DataPasserService, private salesService: SalesService) { }
   resultsHeaders = [
    "CtrRef",
    "Date",
    "DateRef",
    "Customer",
    "Amount",
    "Balance"
  ]
  resultsResults = [
    {ctrRef: "H103123", date: "04/04/2018", dateRef: "04/04/2018", customer: "SHIN ZHIN", amount: "20,000", balance: "20,000" }
  ];
  resultsKeys = [
  {name: 'ctrRef', behavior: 'clickable'},
  {name: "date"},
  {name: "dateRef"},
  {name: "customer"},
  {name: "amount"},
  {name: "balance"}

  ]
    buttons = [
  ]

  ngOnInit() {
    this.dataPasser.sendPageTitle("VIEW COUNTER RECEIPTS");
    this.getPostedSales();
  }

  getPostedSales(){
    this.salesService.getPostedSales().subscribe((data)=>{
     console.log(data);
      // this.resultsResults = data;
    })
  }

  viewReceiptItems(){
    this.viewReceiptItemsModal.show();
    
  }

}
