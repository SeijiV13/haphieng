import { DataPasserService } from './../../../generic/services/data-passer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-bank-file',
  templateUrl: './customer-bank-file.component.html',
  styleUrls: ['./customer-bank-file.component.scss']
})
export class CustomerBankFileComponent implements OnInit {
  formGroup :FormGroup;
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Customer Code', 'Description', 'Address', 'Address 2', 'Telephone',  'Cellphone',  'Email', 'Remarks']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]
  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle('CUSTOMER BANK FILE');
    this.formGroup = this.fb.group({
      customerCode: [''],
      customerDescription: ['']
    });
    this.browseForm = this.fb.group({
      accountName: [''],
      accountNumber: [''],
      bank: [''],
      branch: [''],
      status: [''],
      remarks: ['']
    })
  }

  filter(){

  }
  print(){}
  editDetails(){}



}
