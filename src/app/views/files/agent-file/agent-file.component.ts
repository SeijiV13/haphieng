import { AddAgentComponent } from './../../transaction-modals/add-agent/add-agent.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentService } from '../../../web-services/agent.service';
import { DataPasserService } from '../../../generic/services/data-passer.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'app-agent-file',
  templateUrl: './agent-file.component.html',
  styleUrls: ['./agent-file.component.scss']
})
export class AgentFileComponent implements OnInit {
  @ViewChild('addAgentModal') addAgentModal:AddAgentComponent;
  @ViewChild('resultsTable') resultsTable: GenericTableComponent;
  pagination = 1;
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
  
  constructor(private fb: FormBuilder, private agentService: AgentService, private dataPasserService: DataPasserService) { }

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
    this.agentService.editAgent(this.browseForm.value, this.dataPasserService.selectedData['agent'].id).subscribe((data)=>{

    },error  => this.dataPasserService.sendError(error.errors[0]));
  }

  filter(){
    let name = this.formGroup.controls['name'].value;
    let description = this.formGroup.controls['description'].value;
    let address_1 = this.formGroup.controls['address'].value
    this.agentService.filterAgents(name, description, address_1, 1).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
    }, error  => this.dataPasserService.sendError(error.errors[0]))

  }

  filterOnPagination(page){
    let name = this.formGroup.controls['name'].value;
    let description = this.formGroup.controls['description'].value;
    let address_1 = this.formGroup.controls['address'].value
    this.agentService.filterAgents(name, description, address_1, page).subscribe((data)=>{
      this.resultsResults = data.collection;
      this.resultsTable.setPagination(data.pagination);
    }, error  => this.dataPasserService.sendError(error.errors[0]))

  }

  addNewAgent(){
    this.addAgentModal.show();
  }

  getSelectedAgent(){
    console.log(this.dataPasserService.selectedData['agent']);
   this.browseForm.patchValue(this.dataPasserService.selectedData['agent']);
  }

  print(){}

}
