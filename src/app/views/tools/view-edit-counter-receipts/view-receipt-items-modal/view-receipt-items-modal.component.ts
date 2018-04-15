import { DataPasserService } from './../../../../generic/services/data-passer.service';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-receipt-items-modal',
  templateUrl: './view-receipt-items-modal.component.html',
  styleUrls: ['./view-receipt-items-modal.component.scss']
})
export class ViewReceiptItemsModalComponent implements OnInit {
  @ViewChild('viewReceiptsItemModal') viewReceiptsItemModal: ModalDirective;

  resultsHeaders = [
    "Ref",
    "Date",
    "Agent",
    "Discount",
    "Amount",
    "CounterAmount"
  ]
  resultsResults = [
    {ref: "SHIN ZIN", date: "SHIN ZIN DESC", agent: "BONG", discount: "", amount: "1,000", counterAmount: "1,000" }
  ];
  resultsKeys = [
  {name: "ref"},
  {name: "date"},
  {name: "agent"},
  {name: "discount"},
  {name: "amount"},
  {name: "counterAmount"}
  ]
    buttons = [
  ]

  constructor(private dataPasserService: DataPasserService){

  }

  ngOnInit(){
  }


  public show(){
    this.viewReceiptsItemModal.show();
  }

  public hide(){
    this.viewReceiptsItemModal.hide();
  }

  deleteCounter(){
    
  }

}
