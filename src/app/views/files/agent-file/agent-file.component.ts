import { AddAgentComponent } from './../../transaction-modals/add-agent/add-agent.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentService } from '../../../web-services/agent.service';
import { DataPasserService } from '../../../generic/services/data-passer.service';

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
   {name: 'rowNo'},
   {name: 'name', behavior: 'clickable'},
   {name: 'description'},
   {name: 'address_1'},
   {name: 'address_2'},
   {name: 'telephone'},
   {name: 'cellphone'},
   {name: 'email'},
   {name: 'remarks'} 
  ]
  
  constructor(private fb: FormBuilder, private agentService: AgentService, private dataPasser: DataPasserService) { }

  ngOnInit() {

    this.formGroup = this.fb.group({
      name: [''],
      description: [''],
      address: ['']
    });
    this.browseForm = this.fb.group({
      name: [''],
      description: [''],
      telephone: [''],
      cellphone: [''],
      address_1: [''],
      address_2: [''],
      email: [''],
      remarks: ['']
    });
  }

  editDetails(){
    this.agentService.editAgent(this.browseForm.value, this.dataPasser.selectedData['agent'].id).subscribe((data)=>{

    },error =>{console.log(error)});
  }

  filter(){
    let name = this.formGroup.controls['name'].value;
    let description = this.formGroup.controls['description'].value;
    let address_1 = this.formGroup.controls['address'].value
    this.agentService.filterAgents(name, description, address_1).subscribe((data)=>{
      this.resultsResults = data;
    })

  }

  addNewAgent(){
    this.addAgentModal.show();
  }

  getSelectedAgent(){
    console.log(this.dataPasser.selectedData['agent']);
   this.browseForm.patchValue(this.dataPasser.selectedData['agent']);
  }

  print(){}

}
