import { Component, Input, ViewChild, Output, EventEmitter, AfterViewInit, HostListener } from '@angular/core';
import { MessageConfig } from '../message.config';
import { ModalDirective } from 'ngx-bootstrap';
import { Location } from '@angular/common';
import * as $ from 'jquery';

@Component({
  selector: 'generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent implements AfterViewInit{
  @Input() title: string ="";
  @Input() buttons: any[];
  @Input() type: string;
  @Input() maxZIndex: boolean = false;
  @Input() messageKey: string = "";
  @Output() emitAction = new EventEmitter();
  @ViewChild('genericModal') genericModal: ModalDirective;
 
  transactionMessage: string;
  htmlMessage: boolean = false;

  constructor(private mes: MessageConfig, private location: Location) { }
  ngAfterViewInit() {
    this.genericModal.config.backdrop = 'static';
    this.genericModal.config.keyboard = false;

      this.setColor();
      this.centerModal();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.centerModal();
  }

  centerModal() {
    //make modal center
    $('.generic-modal-comp').addClass('generic-modal-center');
  }
  topModal() {
    $('.generic-modal-comp').removeClass('generic-modal-center');
  }


  show() {
    this.modalIndex();
    this.genericModal.show();
    this.transactionMessage = this.getMessage(this.messageKey);
  }

  hide() {
    this.genericModal.hide();
  }

  showWithCustomMessage(message) {
    this.modalIndex();
    this.genericModal.show();
    this.transactionMessage = message;
  }

  showWithHtmlMessage(message) {
    this.htmlMessage = true;
    this.genericModal.show();
    this.transactionMessage = message;
  }
  
  modalIndex(){
    if(this.maxZIndex){
      $(".modal").addClass("maxZIndex");
    }
  }

  emit(buttonType: string){
    this.emitAction.emit(buttonType);
  }

  processButtons(){
    if(this.buttons){
    let proccessButtonCollection = Array<any>();
    for(let button of this.buttons){
      let buttonName = button.buttonName;
      let buttonEmit = button.buttonEmit;
      let buttonType = button.buttonType;
      proccessButtonCollection.push({buttonName: buttonName, buttonEmit: buttonEmit, buttonType: buttonType})
    }
   return proccessButtonCollection;
  }
  }

  getMessage(transaction: string): string {
    if(this.type === 'success' || this.type === 'confirmation')
    return this.mes.getMessage(transaction);
    else if(this.type === 'error')
    return this.mes.getErrorMessage(transaction);
    else
    console.log("Not a valid type on generic modal");
  }

  setColor(){
    if(this.type === 'success'){
      $(".modal-header").css("border-bottom-color", "green");
      $(".logo").css("color", "green");
    }
    else if(this.type === 'confirmation'){
      $(".modal-header").css("border-bottom-color", "#6a706f");
      $(".logo").css("color", "#6a706f");
    }
    else if(this.type === 'error'){
      $(".modal-header").css("border-bottom-color", "#c42f2f");
      $(".logo").css("color", "#c42f2f");
    }
  }


}
