import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';

@Component({
  selector: 'app-view-edit-inv-damage',
  templateUrl: './view-edit-inv-damage.component.html',
  styleUrls: ['./view-edit-inv-damage.component.scss']
})
export class ViewEditInvDamageComponent implements OnInit {
  formGroup :FormGroup
  browseForm: FormGroup;
  resultsHeaders = ['Ref No.', 'Date', 'Customer',  'Amount', 'Balance']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]
  customers: any;

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService,
              private customerService: CustomerService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW/EDIT INVENTORY DAMAGES");
    this.formGroup = this.fb.group({
      customer: [''],
      refNo: [''],

    });
   this.getDropdownValues();
  }

  getDropdownValues(){
    this.customerService.getCustomers().subscribe((data)=>{
      this.customers = data;
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
