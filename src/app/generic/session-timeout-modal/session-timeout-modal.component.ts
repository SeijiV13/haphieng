import { Component, Input, ViewChild, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { MessageConfig } from '../message.config';
import { ModalDirective } from 'ngx-bootstrap';
import { Location } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'session-timeout-modal',
  templateUrl: './session-timeout-modal.component.html',
  styleUrls: ['./session-timeout-modal.component.css']
})
export class SessionTimeoutModalComponent implements AfterViewInit {
  @Output() acceptTransaction = new EventEmitter();
  @Output() denyTransaction = new EventEmitter();
  @Input() maxZIndex: boolean = false;
  @Input() noWithPath: boolean = false;
  @Input() transaction: string;
  @Input() cancelActivated: boolean = false;
  @Input() confirmButton: string = "Yes";
  @Input() removeNo: boolean = false;
  @ViewChild('timeoutModal') confirmationModal: ModalDirective;
  transactionMessage: string;
  htmlMessage: boolean = false;

  constructor(private mes: MessageConfig, private location: Location) { }
  ngAfterViewInit() {
    this.confirmationModal.config.backdrop = 'static';
    this.confirmationModal.config.keyboard = false;
  //  if ($(window).width() <= 991) {
      this.centerModal();
  //  } else {
    //  this.topModal();
   // }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
   // if ($(window).width() <= 991) {
      this.centerModal();
   // } else {
     // this.topModal();
   // }
  }

  centerModal() {
    //make modal center
    $('.confirmation-modal-comp').addClass('confirmation-modal-center');
  }
  topModal() {
    $('.confirmation-modal-comp').removeClass('confirmation-modal-center');
  }


  show() {
    this.confirmationModal.show();
    this.transactionMessage = this.getMessage(this.transaction);
  }

  showWithCustomMessage(message) {
    this.confirmationModal.show();
    this.transactionMessage = message;
  }

  showWithHtmlMessage(message) {
    this.htmlMessage = true;
    this.confirmationModal.show();
    this.transactionMessage = message;
  }

  hide() {
    this.confirmationModal.hide();
  }

  accept() {
    this.acceptTransaction.emit();
  }

  deny() {
    this.denyTransaction.emit();
  }
  getMessage(transaction: string): string {
    return this.mes.getMessage(transaction);
  }

}
