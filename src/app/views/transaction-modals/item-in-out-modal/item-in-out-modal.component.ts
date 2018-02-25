import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-item-in-out-modal',
  templateUrl: './item-in-out-modal.component.html',
  styleUrls: ['./item-in-out-modal.component.scss']
})
export class ItemInOutModalComponent implements OnInit {
 @ViewChild('itemInOutModal') itemInOutModal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }

   show(){
    this.itemInOutModal.show();
  }
  hide(){
    this.itemInOutModal.hide();
  }

}
