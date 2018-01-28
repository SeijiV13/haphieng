import { AddAgentComponent } from './../../transaction-modals/add-agent/add-agent.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-agent-file',
  templateUrl: './agent-file.component.html',
  styleUrls: ['./agent-file.component.scss']
})
export class AgentFileComponent implements OnInit {
  @ViewChild('addAgentModal') addAgentModal:AddAgentComponent;
  formGroup :FormGroup;
  browseForm: FormGroup;
  resultsHeaders = ['Row No.', 'Name', 'Description', 'Address', 'Address 2', 'Telephone',  'Cellphone',  'Email', 'Remarks']
  resultsResults = []
  resultsKeys = [ 
   {name: 'requestNo', behavior: 'clickable'} 
  ]
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.formGroup = this.fb.group({
      name: [''],
      description: [''],
      address: ['']
    });
    this.browseForm = this.fb.group({
      agentName: [''],
      description: [''],
      telephone: [''],
      cellphone: [''],
      address: [''],
      address2: [''],
      email: [''],
      remarks: ['']
    });
  }

  editDetails(){
    
  }

  filter(){

  }

  addNewAgent(){
    this.addAgentModal.show();
  }

  print(){}

}
