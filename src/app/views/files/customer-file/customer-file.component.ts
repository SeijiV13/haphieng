import { AddCustomerComponent } from './../../transaction-modals/add-customer/add-customer.component';
import { DataPasserService } from './../../../generic/services/data-passer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { CustomerService } from '../../../web-services/customer.service';
import { AgentService } from '../../../web-services/agent.service';

@Component({
  selector: 'app-customer-file',
  templateUrl: './customer-file.component.html',
  styleUrls: ['./customer-file.component.scss']
})
export class CustomerFileComponent implements OnInit {
  @ViewChild('addCustomerModal') addCustomerModal: AddCustomerComponent;
  agents: any;
  formGroup :FormGroup
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Customer Code', 'Description','Agent','Address', 'Address2', 'Telephone', 'Resident Phone', 'Fax', 'Cellphone', 'Terms', 'Tin No', 'Contact Person', 'Email', 'Credit Limit', 'Initial Balance', 'Remaining', 'Remarks']
  resultsResults = []
  resultsKeys = [
   {name: 'rowNo'}, 
   {name: 'code', behavior: 'clickable'},
   {name: 'description'},
   {name: 'agent'},
   {name: 'address_1'},
   {name: 'address_2'},
   {name: 'telephone'},
   {name: 'resident_phone'},
   {name: 'fax'},
   {name: 'cellphone'},
   {name: 'terms'},
   {name: 'tin_number'},
   {name: 'contact_person'},
   {name: 'email'},
   {name: 'credit_limit'},
   {name: 'initial_balance'},
   {name: 'remaining'},
   {name: 'remarks'}
  ]
  pricingHeaders = ['Item Code', 'Price'];
  pricingResults = [];
  pricingKeys = []
  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService, private customerService: CustomerService, private agentService: AgentService) { }
 
  ngOnInit() {
    this.dataPasserService.sendPageTitle("CUSTOMER FILE");
    this.formGroup = this.fb.group({
      customer: [''],
      description: [''],
      agent: [''],
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
      remarks: ['']


    });
    this.getDropdownValues();
  }
  
  getDropdownValues(){
    this.agentService.getAgents().subscribe((data)=>{
     this.agents = data;
    }, error  => this.dataPasserService.sendError(error.errors[0]));
  }

  filter(){
     this.customerService.getCustomers().subscribe((data)=>{
       this.resultsResults = data;
     }, error  => this.dataPasserService.sendError(error.errors[0]))
  } 
  addNewCustomer(){
   this.addCustomerModal.show();
  }

  getSelectedCustomer(){
    this.browseForm.patchValue(this.dataPasserService.selectedData['customer']);
  }

  print(){
     
  }

  editDetails(){
    this.customerService.editCustomer(this.browseForm.value, this.dataPasserService.selectedData['customer'].id).subscribe((data)=>{
    }, error  => this.dataPasserService.sendError(error.errors[0])) 
   }

}
