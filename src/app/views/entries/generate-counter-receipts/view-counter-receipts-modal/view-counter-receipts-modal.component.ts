import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'view-counter-receipts-modal',
  templateUrl: './view-counter-receipts-modal.component.html',
  styleUrls: ['./view-counter-receipts-modal.component.scss']
})
export class ViewCounterReceiptsModalComponent implements OnInit {
  @ViewChild('counterReceiptsModal') counterReceiptModal: ModalDirective;
  entryHeaders = [
    "Date",
    "Ref No.",
    "Terms",
    "Agent",
    "Amount",
    "Balance",
  ]
 entryResults = [
    {date: "11/11/2018", refNo: "H8901230", terms: "sample", agent: "BONG", amount:"1000", balance: "1000" }
  ];
  entryKeys = [
  {name: 'date'},
  {name: "refNo"},
  {name: "terms"},
  {name: "agent"},
  {name: "amount"},
  {name: "balance"},

  ]
    buttons = [
  ]
  constructor() { }

  ngOnInit() {
  }

  public show(){
    this.counterReceiptModal.show();
  }
  
  public hide(){
    this.counterReceiptModal.hide();
  }

  generateCounter(){}

}
