import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-supplier-transactions',
  templateUrl: './supplier-transactions.component.html',
  styleUrls: ['./supplier-transactions.component.scss']
})
export class SupplierTransactionsComponent implements OnInit {

 formGroup :FormGroup;
  browseForm: FormGroup;
  resultsHeaders = [ 'Date', 'Description',  'Currency', 'Debit', 'Credit']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("SUPPLIER TRANSACTIONS");
    this.formGroup = this.fb.group({
      supplier: [''],
    });

  }

  filter(){

  }

  print(type){
    if(type === 'old'){

    }else if (type === 'new'){

    }
     
  }
  editDetails(){

  }

}
