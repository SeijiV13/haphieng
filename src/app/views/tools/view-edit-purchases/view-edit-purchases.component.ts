import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { SupplierService } from '../../../web-services/supplier.service';
import { PurchaseService } from '../../../web-services/purchase.service';

@Component({
  selector: 'app-view-edit-purchases',
  templateUrl: './view-edit-purchases.component.html',
  styleUrls: ['./view-edit-purchases.component.scss']
})
export class ViewEditPurchasesComponent implements OnInit {

 
formGroup :FormGroup
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Ref No.', 'Date',  'Terms', 'Total Peso Amount', 'Total Yuan Amount']
  resultsResults = []
  resultsKeys = [
   {name: 'rowNo'},  
   {name: 'reference_number'} ,
   {name : 'date'},
   {name: 'terms'},
   {name: 'total_peso'},
   {name: 'total_yuan'}

  ];
  suppliers: any;

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService,
              private supplierService: SupplierService,
              private purchaseService: PurchaseService) { }
 
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
    let refNo = this.formGroup.controls['refNo'].value;
    let supplier = this.formGroup.controls['supplier'].value;
    this.purchaseService.getFilteredPurchase(refNo, supplier).subscribe((data)=>{
     this.resultsResults = data;
    })
  }

  print(type){
    if(type === 'old'){

    }else if (type === 'new'){

    }
     
  }
  editDetails(){

  }

}
