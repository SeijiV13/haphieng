import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { GenericTableComponent } from '../../../../generic/generic-table/generic-table.component';
import { ProductsService } from '../../../../web-services/products.service';
import { SalesService } from '../../../../web-services/sales.service';
@Component({
  selector: 'view-counter-receipts-modal',
  templateUrl: './view-counter-receipts-modal.component.html',
  styleUrls: ['./view-counter-receipts-modal.component.scss']
})
export class ViewCounterReceiptsModalComponent implements OnInit {
  @ViewChild('counterReceiptsModal') counterReceiptModal: ModalDirective;
  @ViewChild('entryTable') entryTable: GenericTableComponent;
  entryHeaders = [
    "Row No.",
    "Item code",
    "Description",
    "Warehouse",
    "Quantity",
    "Quantity Stock",
    "Pending Quantity",
    "Price",
    "Amount",
  ]
  entryResults = [];
  entryKeys = [
     {"name": "rowNo"},
     {"name": "itemCode"},
     {"name":"description"},
     {"name": "warehouse"},
     {"name": "quantity"},
     {"name": "available"},
     {"name": "pending"},
     {"name": "price"},
     {"name": "amount"},
  ];
    buttons = [
  ]
  constructor(private productService: ProductsService,
              private salesService: SalesService) { }

  ngOnInit() {
  }

  public show(id){
    this.entryResults = [];
    this.getItems(id)
    this.counterReceiptModal.show();
  }
  
  public hide(){
    this.counterReceiptModal.hide();
  }

  generateCounter(){}

  getItems(id: string){
    this.entryTable.showLoader();
      this.salesService.getSale(id).subscribe((data)=>{
         this.retrieveItemsOfSuspendedSale(data);
      })

  }


  
  retrieveItemsOfSuspendedSale(sales){
    this.productService.getProducts().subscribe((data)=>{
      for(let item of sales.included){
        let selecteditem = data.filter((items) => items.id == item.attributes.product_id);
        if(selecteditem){
          let originalprice = parseFloat(item.attributes['price_override']);
          selecteditem[0]['price'] = originalprice;
          
          //compute for amount
          selecteditem[0]['amount'] = parseFloat(selecteditem[0]['price']) * parseFloat(item.attributes['quantity']);
          this.entryResults.push({
            id: selecteditem[0]['id'],
            itemCode: selecteditem[0]['code'],
            description:  selecteditem[0]['description'],
            originalprice: selecteditem[0]['gross_price'],
            available: selecteditem[0]['available_quantity'],
            pending: selecteditem[0]['pending_quantity'],
            itemRemarks: selecteditem[0]['remarks_1'],
            category: selecteditem[0]['category'],

            agent: item.attributes.agent_id,
            lastprice: "",
            quantity: item.attributes.quantity,
            warehouse: item.attributes.warehouse_source,
            good: "",
            qtyNew: "",
            adjustmentRemarks: "",

            price: selecteditem[0]['price'],
            amount: selecteditem[0]['amount']
            
          })
    
        }
      }
      this.entryTable.hideLoader();
     
    })
  }

}
