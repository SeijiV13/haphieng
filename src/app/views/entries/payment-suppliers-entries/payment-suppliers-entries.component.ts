import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
import { DataPasserService } from '../../../generic/services/data-passer.service';

@Component({
  selector: 'app-payment-suppliers-entries',
  templateUrl: './payment-suppliers-entries.component.html',
  styleUrls: ['./payment-suppliers-entries.component.scss']
})
export class PaymentSuppliersEntriesComponent implements OnInit {
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  @ViewChild('addPaymentModal') addPaymentModal: GenericModalComponent;
  resultsHeaders = [
    "Supplier",
    "Amount",
  ];
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "suppliers"},
     {"name": "amount"}
     
  ];
    buttons = [
    {'name': "Create Payment", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
  ]
  constructor(private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("PAYMENT TO SUPPLIERS ENTRY");
  }

  doAction(type){
    if(type === 'post'){
       this.addPaymentModal.show();
    }
  }

  removeRow(index){
    this.resultsResults.splice(index, 1);
  }

}
