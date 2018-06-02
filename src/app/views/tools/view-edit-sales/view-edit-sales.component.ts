import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';

@Component({
  selector: 'app-view-edit-sales',
  templateUrl: './view-edit-sales.component.html',
  styleUrls: ['./view-edit-sales.component.scss']
})
export class ViewEditSalesComponent implements OnInit {
  formGroup :FormGroup
  browseForm: FormGroup;
  customers: any
  resultsHeaders = ['Ref No.', 'Date', 'Customer', 'Terms', 'Amount', 'Balance', 'Ctr Ref']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]

  constructor(private fb: FormBuilder, 
              private dataPasserService: DataPasserService,
              private customerService: CustomerService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW/EDIT SALES");
    this.formGroup = this.fb.group({
      customer: [''],
      refNo: [''],

    });
    this.getDropdownValues();
  }

  filter(){

  }


  print(type){
    if(type === 'old'){

    }else if (type === 'new'){

    }
     
  }

  getDropdownValues(){
     this.customerService.getCustomers().subscribe((data)=>{
       this.customers = data;
     })
  }

  editDetails(){

  }

}
