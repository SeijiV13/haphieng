import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { SupplierService } from '../../../web-services/supplier.service';

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
  ];
  suppliers: any;

  constructor(private fb: FormBuilder, 
             private dataPasserService: DataPasserService,
            private supplierService: SupplierService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("SUPPLIER TRANSACTIONS");
    this.formGroup = this.fb.group({
      supplier: [''],
    });
    this.getDropdownValues();
  }
  getDropdownValues(){
    this.supplierService.getSuppliers().subscribe((data)=>{
      this.suppliers = data;
    })
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
