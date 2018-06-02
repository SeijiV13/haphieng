import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { SupplierService } from '../../../web-services/supplier.service';

@Component({
  selector: 'app-view-edit-purchases',
  templateUrl: './view-edit-purchases.component.html',
  styleUrls: ['./view-edit-purchases.component.scss']
})
export class ViewEditPurchasesComponent implements OnInit {

 
formGroup :FormGroup
  browseForm: FormGroup;
  resultsHeaders = ['Ref No.', 'Date', 'Supplier',  'Terms', 'Amount']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ];
  suppliers: any;

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService,
              private supplierService: SupplierService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW/EDIT PURCHASES");
    this.formGroup = this.fb.group({
      supplier: [''],
      refNo: [''],

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
