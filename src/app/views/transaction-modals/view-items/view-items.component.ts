import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SalesService } from '../../../web-services/sales.service';
import { ProductsService } from '../../../web-services/products.service';
import { PurchaseService } from '../../../web-services/purchase.service';
import { DataPasserService } from '../../../generic/services/data-passer.service';
import { DamageService } from '../../../web-services/damage.service';
import { GenericTableComponent } from '../../../generic/generic-table/generic-table.component';

@Component({
  selector: 'view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.scss']
})
export class ViewItemsComponent implements OnInit {
  @ViewChild('viewItemsModal') viewItemsModal: ModalDirective;
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
  constructor(private salesService: SalesService, 
              private productService: ProductsService,
              private purchaseService: PurchaseService,
              private dataPasserService: DataPasserService,
              private damageService: DamageService) { }

  ngOnInit() {
  }


  public show(type, id){
    this.entryResults = [];
    this.getItems(type, id)
    this.viewItemsModal.show();
  }
  
  public hide(){
    this.viewItemsModal.hide();
  }

  getItems(type, id){
    this.entryTable.showLoader();
    if(type == 'sale'){
      this.salesService.getSale(id).subscribe((data)=>{
         this.retrieveItemsOfSuspendedSale(data);
      })

    }else if(type == 'sale_return'){
      this.salesService.getSaleReturn(id).subscribe((data)=>{
        this.retrieveItemsOfSuspendedSale(data);
 
      })
      
    }else if(type == 'purchase'){
      this.purchaseService.getPurchase(id).subscribe((data)=>{
        this.retrieveItemsOfSuspendedSale(data);

      })

    }else if(type == 'purchase_return'){
      this.purchaseService.getPurchaseReturn(id).subscribe((data)=>{
        this.retrieveItemsOfSuspendedSale(data);
  
      })

    }else if(type == 'damage'){
      this.damageService.getDamageItem(id).subscribe((data)=>{
        this.retrieveItemsOfSuspendedSale(data);
     
      })

    }
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
