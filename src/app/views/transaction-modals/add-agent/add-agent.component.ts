import { DataPasserService } from './../../../generic/services/data-passer.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgentService } from '../../../web-services/agent.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  @ViewChild('addAgentModal') addAgentModal: ModalDirective;
  browseForm: FormGroup;
  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService, private agentService: AgentService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle('AGENT FILE');
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

  show(){
    this.addAgentModal.show();
  }
  hide(){
    this.addAgentModal.hide();
  }

  addAgent(){
     this.agentService.createAgent(this.browseForm.getRawValue()).subscribe((data)=>{
         this.addAgentModal.hide();
     }, error =>{
       console.log(error);
     })
  }

}
