import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-suspended-sales',
  templateUrl: './suspended-sales.component.html',
  styleUrls: ['./suspended-sales.component.scss']
})
export class SuspendedSalesComponent implements OnInit {
  @ViewChild("suspendedSalesModal") suspendedModal: ModalDirective;
  resultsHeaders = [
    "DR Ref No.",
    "Customer",
    "Date"
  ]
  suspendedResults = [];
  suspendedKeys = [
  ];

  constructor() { }

  ngOnInit() {
  }
  show(){
    this.suspendedModal.show();
  }
  hide(){
    this.suspendedModal.hide();
  }


  resume(){

  }

}
