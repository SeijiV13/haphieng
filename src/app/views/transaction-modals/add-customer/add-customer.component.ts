import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../web-services/customer.service';
import { AgentService } from '../../../web-services/agent.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  agents;
  browseForm: FormGroup;
  @ViewChild('addCustomerModal') addCustomerModal: ModalDirective;
  constructor(private fb : FormBuilder, private customerService: CustomerService, private agentService: AgentService) { }

  ngOnInit() {
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
    })
  }

  show(){
    this.addCustomerModal.show();
  }
  hide(){
    this.addCustomerModal.hide();
  }

  addCustomer(){
    this.customerService.createCustomer(this.browseForm.value).subscribe((data)=>{
      this.addCustomerModal.hide();
    }, error => console.log(error))
  }


}
