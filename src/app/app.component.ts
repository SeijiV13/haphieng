import { Component } from '@angular/core';
import { MessageConfig } from "./generic/message.config";
import { Router} from "@angular/router";
import { XfsPageComponent} from './generic/xfs-page/xfs-page.component';
import { DataPasserService } from './generic/services/data-passer.service';
import { ProductsService } from './web-services/products.service';
import { CustomerService } from './web-services/customer.service';
import { AgentService } from './web-services/agent.service';
import { SupplierService } from './web-services/supplier.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})

export class AppComponent {
    constructor(private config: MessageConfig, 
        private router: Router, 
        private dataPasserService: DataPasserService,
        private customerService: CustomerService,
        private productService: ProductsService,
        private agentService: AgentService,
        private supplierService: SupplierService
        ) {
        this.config.load();
        this.getSession();
        this.xfsPrevention();
    }


    getSession(){
        if(localStorage.getItem('access-token')){
           this.dataPasserService.accessToken = localStorage.getItem('access-token');
           this.dataPasserService.client =  localStorage.getItem('client');
           this.dataPasserService.tokenType = localStorage.getItem('tokenType');
           this.dataPasserService.expiry =  localStorage.getItem('expiry');
           this.dataPasserService.uid =  localStorage.getItem('uid');
           this.dataPasserService.username = localStorage.getItem('uid');
           this.customerService.getCustomers().subscribe((data)=>{
            this.dataPasserService.dropdowns['customer'] = data;
          });
          this.supplierService.getSuppliers().subscribe((data)=>{
            this.dataPasserService.dropdowns['supplier'] = data;
          })
          this.agentService.getAgents().subscribe((data)=>{
            this.dataPasserService.dropdowns['agent'] = data;
          });
          this.productService.getProducts().subscribe((data)=>{
              this.dataPasserService.dropdowns['product'] = data;
          })
        }else{
            this.router.navigate(['']);
        }
        
    }
    
    xfsPrevention(){
        if(self != top){
            this.router.navigate(['/xfs']);
        }
    }
}

