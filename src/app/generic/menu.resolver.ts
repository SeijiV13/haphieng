import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from './httpClient.config';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MenuResolver implements Resolve<any>{

    constructor(private http: HttpClient) { }

    //Observable<any> | Promise<any> | any
    resolve(route: ActivatedRouteSnapshot) {
        return this.getMenuHaphiengItems();
    }

    getMenuItems() {
        let headers = new Headers();
        return this.http.get("app/maintenance/menu", headers).map((menuItems: Response) => menuItems.json());
    }

    getMenuHaphiengItems(){
        let json = 
        [   //first group
            {path: null, name: "ENTRIES", level: 1, group: "3050"},
             { path: "/home/salesEntries", name: "Sales Entries", level: 2, group: "3050" },
             { path: "/home/salesReturnEntries", name: "Sales Return Entries", level: 2, group: "3050" },
             { path: "/home/purchaseEntries", name: "Purchase Entries", level: 2, group: "3050" },
             { path: "/home/purchaseReturnEntries", name: "Purchase Return Entries", level: 2, group: "3050" },
             { path: "/home/invQuantityAdjEntries", name: "Inventory Quantity Adjustment Entries", level: 2, group: "3050" },
             { path: "/home/transferringStockEntries", name: "Transferring Stock Entries", level: 2, group: "3050" },
             { path: "/home/invDamageEntries", name: "Inventory Damage Entries", level: 2, group: "3050" },
             { path: "/home/generateSalesCounterReceipts", name: "Generate Sales Counter Receipts", level: 2, group: "3050" },
             { path: "/home/collectionFromCustomersEntries", name: "Collection from Customers Entries", level: 2, group: "3050" },
             { path: "/home/paymentToSuppliersEntries", name: "Payment to Suppliers Entries", level: 2, group: "3050" },
            //secnd group
            {path: null, name: "FILES", level: 1, group: "3060"},
             { path: "/home/inventoryFile", name: "Inventory File", level: 2, group: "3060" },
             { path: "/home/customerFile", name: "Customer File", level: 2, group: "3060" },
             { path: "/home/supplierFile", name: "Supplier File", level: 2, group: "3060" },
             { path: "/home/agentFile", name: "Agent File", level: 2, group: "3060" },
             { path: "/home/customerBankFile", name: "Customer Bank File", level: 2, group: "3060" },
            //third group
            {path: null, name: "REPORTS", level: 1, group: "3070"},
             { path: "/home/salesReports", name: "Sales Reports", level: 2, group: "3070" },
             { path: "/home/salesReturnReports", name: "Sales Return Reports", level: 2, group: "3070" },
             { path: "/home/purchaseReports", name: "Purchase Reports", level: 2, group: "3070" },
             { path: "/home/purchaseReturnReports", name: "Purchase Return Reports", level: 2, group: "3070" },
             { path: "/home/itemInOutTransactions", name: "Item-In Out Transactions", level: 2, group: "3070" },
             {  path:"/home/productsList", name: "Product List", level: 2, group: "3070" },
             { path: "/home/customersList", name: "Customers List", level: 2, group: "3070" },
             { path: "/home/suppliersList", name: "Suppliers List", level: 2, group: "3070" },
             { path: "/home/agentList", name: "Agent List", level: 2, group: "3070" },

            
            //fourth group
            {path: null, name: "TOOLS", level: 1, group: "3080"},
             { path: "/home/viewEditSales", name: "View/Edit Sales", level: 2, group: "3080" },
             { path: "/home/viewEditSalesReturns", name: "View/Edit Sales Returns", level: 2, group: "3080" },
             { path: "/home/viewEditPurchases", name: "View/Edit Purchases", level: 2, group: "3080" },
             { path: "/home/viewEditPurchasesReturns", name: "View/Edit Purchases Returns", level: 2, group: "3080" },
             { path: "/home/viewEditCounterReceipts", name: "View/Edit Counter Receipts", level: 2, group: "3080" },
             { path: "/home/viewEditQuantityStockAdjustments", name: "View/Edit Quantity Stock Adjustments", level: 2, group: "3080" },
             { path: "/home/viewEditInventoryDamages", name: "View/Edit Inventory Damages", level: 2, group: "3080" },
             { path: "/home/customerTransactions", name: "Customer Transactions", level: 2, group: "3080" },
             { path: "/home/supplierTransactions", name: "Supplier Transactions", level: 2, group: "3080" },
             { path: "/home/administratorControl", name: "Administrator Control", level: 2, group: "3080" },

            
            //fifth group
            {path: null, name: "HELP", level: 1, group: "3090"},
            { path: "/home/about", name: "About", level: 2, group: "3090" },
            { path: "/home/contactUs", name: "Contact Us", level: 2, group: "3090" },

        ]
        return json;

    }

 



}
