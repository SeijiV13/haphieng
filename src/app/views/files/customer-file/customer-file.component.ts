import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-customer-file',
  templateUrl: './customer-file.component.html',
  styleUrls: ['./customer-file.component.scss']
})
export class CustomerFileComponent implements OnInit {
  @ViewChild('addCustomerModal') addCustomerModal: AddCustomerComponent;
  formGroup :FormGroup
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Customer Code', 'Description','Agent','Address', 'Address2', 'Telephone', 'Resident Phone', 'Fax', 'Cellphone', 'Terms', 'Tin No', 'Contact Person', 'Email', 'Credit Limit', 'Initial Balance', 'Remaining', 'Remarks']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]
  pricingHeaders = ['Item Code', 'Price'];
  pricingResults = [];
  pricingKeys = []
  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("CUSTOMER FILE");
    this.formGroup = this.fb.group({
      customer: [''],
      description: [''],
      agent: [''],
    });
    this.browseForm = this.fb.group({
      customerCode: [''],
      description: [''],
      address: [''],
      address2: [''],
      agent:[''],
      residentPhone: [''],
      telephone: [''],
      cellphone: [''],
      terms: [''],
      email : [''],
      fax: [''],
      tinNo: [''],
      contactPerson: [''],
      creditLimit:[''],
      initialBalance: [''],
      remaining: [''],
      customerType: [''],
      remarks: ['']


    })
  }

  filter(){

  }
  addNewCustomer(){
   this.addCustomerModal.show();
  }

  print(){
     
  }

  editDetails(){

  }

}
