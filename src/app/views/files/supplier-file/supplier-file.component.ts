import { AddSupplierComponent } from './../../transaction-modals/add-supplier/add-supplier.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-supplier-file',
  templateUrl: './supplier-file.component.html',
  styleUrls: ['./supplier-file.component.scss']
})
export class SupplierFileComponent implements OnInit {
  @ViewChild('addSupplierModal') addSupplierModal: AddSupplierComponent
 formGroup: FormGroup;
 browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Supplier Code', 'Description']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]
  pricingHeaders = ['Item Code', 'Cost', 'New Date', 'New Cost'];
  pricingResults = [];
  pricingKeys = []

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle('SUPPLIER FILE');
    this.formGroup = this.fb.group({
      description:[''],
      supplierCode: ['']
    });
    this.browseForm = this.fb.group({
      supplierCode: [''],
      description:[''],
      telephone: [''],
      fax: [''],
      initialBalance: [''],
      address: [''],
      addressTwo: [''],
      email: [''],
      terms: [''],
      remaining: ['']
    })
  }
  editDetails(){

  }
  filter(){

  }
  addNewSupplier(){
    this.addSupplierModal.show();
  }
}
