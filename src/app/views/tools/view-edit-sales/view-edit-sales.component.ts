import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-view-edit-sales',
  templateUrl: './view-edit-sales.component.html',
  styleUrls: ['./view-edit-sales.component.scss']
})
export class ViewEditSalesComponent implements OnInit {
  formGroup :FormGroup
  browseForm: FormGroup;
  resultsHeaders = ['Ref No.', 'Date', 'Customer', 'Terms', 'Amount', 'Balance', 'Ctr Ref']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]

  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("VIEW/EDIT SALES");
    this.formGroup = this.fb.group({
      customer: [''],
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
