import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MessageConfig } from '../message.config';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html'
})
export class AlertModalComponent{
  @Output() acceptAlert = new EventEmitter();
  @Input() message: string;
  @ViewChild('alertModal') alertModal: AlertModalComponent;
  transactionMessage: string;
  OkPressed:boolean;

  constructor(private mes : MessageConfig) { }

  show() {
    if(this.message && this.mes.getMessage(this.message)) this.transactionMessage = this.mes.getMessage(this.message)
    this.alertModal.show();
  }
  
  hide() {
    this.alertModal.hide();
  }

  accept() {
    this.acceptAlert.emit();
    this.hide();
  }

}
