import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-view-edit-purchases-return',
  templateUrl: './view-edit-purchases-return.component.html',
  styleUrls: ['./view-edit-purchases-return.component.scss']
})
export class ViewEditPurchasesReturnComponent implements OnInit {

 
formGroup :FormGroup;
  browseForm: FormGroup;
  resultsHeaders = ['Ref No.', 'Date', 'Supplier',  'Amount']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW/EDIT PURCHASES RETURNS");
    this.formGroup = this.fb.group({
      supplier: [''],
      refNo: [''],

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
