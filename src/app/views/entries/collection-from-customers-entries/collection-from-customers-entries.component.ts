import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericModalComponent } from '../../../generic/generic-modal/generic-modal.component';
import { DataPasserService } from '../../../generic/services/data-passer.service';

@Component({
  selector: 'collection-from-customers-entries',
  templateUrl: './collection-from-customers-entries.component.html',
  styleUrls: ['./collection-from-customers-entries.component.scss']
})
export class CollectionFromCustomersEntriesComponent implements OnInit {
  @ViewChild('errorModal') errorModal: GenericModalComponent;
  @ViewChild('addPaymentModal') addPaymentModal: GenericModalComponent;
  resultsHeaders = [
    "Customer",
    "Amount",
  ];
  resultsResults = [];
  resultsKeys = [
     {"name": "rowNo"},
     {"name": "category"},
     
  ];
    buttons = [
    {'name': "Create Payment", 'id': "post-button", 'logo': 'glyphicon glyphicon-file', 'type': 'post', 'behavior':'single'},
  ]
  constructor(private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle("COLLECTION FROM CUSTOMERS ENTRY");
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
