import { DataPasserService } from './../../../generic/services/data-passer.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {
  @ViewChild('addAgentModal') addAgentModal: ModalDirective;
  browseForm: FormGroup;
  constructor(private fb: FormBuilder, private dataPasserService: DataPasserService) { }

  ngOnInit() {
    this.dataPasserService.sendPageTitle('AGENT FILE');
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

  show(){
    this.addAgentModal.show();
  }
  hide(){
    this.addAgentModal.hide();
  }

  addAgent(){
    
  }

}
