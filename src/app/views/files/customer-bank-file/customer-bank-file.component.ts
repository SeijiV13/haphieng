import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../web-services/customer.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-customer-bank-file',
  templateUrl: './customer-bank-file.component.html',
  styleUrls: ['./customer-bank-file.component.scss']
})
export class CustomerBankFileComponent implements OnInit {
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  formGroup :FormGroup;
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Customer Code', 'Description', 'Address', 'Address 2', 'Telephone',  'Cellphone',  'Email', 'Remarks']
  resultsResults = []
  resultsKeys = [ 
   {name: 'rowNo'},
   {name: 'code', behavior: 'clickable'},
   {name: 'description'},
   {name: 'address_1'},
   {name: 'address_2'},
   {name: 'telephone'},
   {name: 'cellphone'},
   {name: 'email'},
   {name: 'remarks'} 
  ]
  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService, private customerService: CustomerService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle('CUSTOMER BANK FILE');
    this.formGroup = this.fb.group({
      customerCode: [''],
      customerDescription: ['']
    });
    this.browseForm = this.fb.group({
      code: [''],
      description: [''],
      address_1: [''],
      address_2: [''],
      agent:[''],
      resident_phone: [''],
      telephone: [''],
      cellphone: [''],
      terms: [''],
      email : [''],
      fax: [''],
      tin_number: [''],
      contact_person: [''],
      credit_limit:[''],
      initial_balance: [''],
      remaining: [''],
      customer_type: [''],
      remarks: [''],

      bank_account_name: [''],
      bank_account_number: [''],
      bank_name: [''],
      bank_branch: [''],
      bank_status: [''],
      bank_remarks: ['']
    })
  }

  filter(){
    let code = this.formGroup.controls['customerCode'].value;
    let description =this.formGroup.controls['customerDescription'].value;
    this.customerService.filterCustomers(description, code, "", 1).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
    });
  }
  filterOnPagination(page){
    let code = this.formGroup.controls['customerCode'].value;
    let description =this.formGroup.controls['customerDescription'].value;
    this.customerService.filterCustomers(description, code, "", page).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
    });
  }
  print(){}
  editDetails(){
    this.customerService.editCustomer(this.browseForm.getRawValue(), this.dataPasserService.selectedData['customer'].id).subscribe((data)=>{

    }, error  => this.dataPasserService.sendError(error.errors[0]));
  }

  getSelectedCustomer(){
    this.browseForm.patchValue(this.dataPasserService.selectedData['customer']);
  }



}
