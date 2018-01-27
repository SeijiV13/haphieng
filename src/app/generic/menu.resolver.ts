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
            {path: null, name: "Entries", level: 1, group: "3050"},
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
            {path: null, name: "Files", level: 1, group: "3060"},
             { path: "/home/inventoryFile", name: "Inventory File", level: 2, group: "3060" },
             { path: "/home/customerFile", name: "Customer File", level: 2, group: "3060" },
             { path: "/home/supplierFile", name: "Supplier File", level: 2, group: "3060" },
             { path: "/home/agentFile", name: "Agent File", level: 2, group: "3060" },
             { path: "/home/customerBankFile", name: "Customer Bank File", level: 2, group: "3060" },
            //third group
            {path: null, name: "Reports", level: 1, group: "3070"},
             { path: "/home/salesReports", name: "Sales Reports", level: 2, group: "3070" },
             { path: "/home/salesReturnReports", name: "Sales Return Reports", level: 2, group: "3070" },
             { path: "/home/purchaseReports", name: "Purchase Reports", level: 2, group: "3070" },
             { path: "/home/purchaseReturnReports", name: "Purchase Return Reports", level: 2, group: "3070" },
             { path: "/home/itemInOutTransactions", name: "Item-In Out Transactions", level: 2, group: "3070" },
             {  path: null, name: "Product List", level: 2, group: "3070" },
              { path: "/home/priceListImported", name: "Price List (Imported)", level: 3, group: "3070" },
              { path: "/home/priceListLocal", name: "Price List (Local)", level: 3, group: "3070" },
              { path: "/home/externalPriceListImported", name: "External - List All Products (Imported)", level: 3, group: "3070" },
              { path: "/home/externalPriceListLocal", name: "External - List All Products (Local)", level: 3, group: "3070" },
              { path: "/home/externalPriceListNoPrice", name: "External - List All Products (No Price)", level: 3, group: "3070" },
              { path: "/home/internalListAllProducts", name: "List All Products", level: 3, group: "3070" },
              { path: "/home/listProductsByCategory", name: "List Products by Category", level: 3, group: "3070" },
              { path: "/home/damagedInventorySummary", name: "Damaged Inventory Summary", level: 3, group: "3070" },
              { path: "/home/quantityAdjustmentInventory", name: "Quantity Adjustment Inventory", level: 3, group: "3070" },

            { path: "/home/customersList", name: "Customers List", level: 2, group: "3070" },
            { path: "/home/suppliersList", name: "Suppliers List", level: 2, group: "3070" },
            { path: "/home/agentList", name: "Agent List", level: 2, group: "3070" },

            
            //fourth group
            {path: null, name: "Tools", level: 1, group: "3080"},
             { path: "/home/viewEditSales", name: "View Edit Sales", level: 2, group: "3080" },
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
            {path: null, name: "Help", level: 1, group: "3090"},
            { path: "/home/about", name: "About", level: 2, group: "3090" },
            { path: "/home/contactUs", name: "Contact Us", level: 2, group: "3090" },

        ]
        return json;

    }

    getMenuItems2() {
        let json =
            [
                { path: null, name: "Property Appraisal", level: 1, group: "3050" },
                //LEVEL 2 DEPTH
                { path: null, name: "Appraisal Assignment", level: 2, group: "3050" },
                //LEVEL 3 DEPTH
                { path: "/home/appraisalRequestAssignmentRE", name: "RE Appraisal Request - Assignment", level: 3, group: "3050" },
                { path: "/home/appraisalRequestAssignmentMotor", name: "MC Appraisal Request - Assignment", level: 3, group: "3050" },
                { path: "/home/appraisalRequestReAssignmentRE", name: "RE Appraisal Request - Re-Assignment", level: 3, group: "3050" },
                { path: "/home/appraisalRequestReAssignmentMotor", name: "MC Request - Re-Assignment", level: 3, group: "3050" },
                { path: "/home/appraisalRequestDocumentChecklistRE", name: "RE Appraisal Request - Document Checklist", level: 3, group: "3050" },
                { path: "/home/appraisalRequestDocumentChecklistMotor", name: "MC Apprisal Request - Document Checklist", level: 3, group: "3050" },

                //LEVEL 2 DEPTH
                { path: null, name: "Appraisal Request/Report", level: 2, group: "3050" },
                //LEVEL 3 DEPTH
                { path: "/home/appraisalRequestMaintenanceRE", name: "RE Appraisal Request Maintenance", level: 3, group: "3050" },
                { path: "/home/appRepMaint", name: "Re Appraisal Request Maintenance [For Appraiser Use]", level: 3, group: "3050" },
                { path: "/home/appRepMaintExt", name: "Re Appraisal Request Maintenance [For External Appraiser Use]", level: 3, group: "3050" },
                { path: "/home/appraisalRequestMaintenanceMotor", name: "Motor Car Appraisal Request Maintenance", level: 3, group: "3050" },
                { path: "/home/appRepMaintApprove", name: "RE Appraisal Report Approval", level: 3, group: "3050" },
                { path: "/home/appRepMaintBasic", name: "RE Appraisal Report Maintenance", level: 3, group: "3050" },
                { path: '/home/appRepVerifyExt', name: "RE Appraisal Report - Verification of Title", level: 3, group: "3050" },
                { path: "/home/motorRepMaint", name: "Motor Car Appraisal Report Maintenance", level: 3, group: "3050" },
                { path: "/home/motorRepMaintApprove", name: "Motor Car Appraisal Report Approval", level: 3, group: "3050" },

                { path: null, name: "Others", level: 2, group: "3050" },
                //LEVEL 3 DEPTH
                { path: "/home/motorRepMaintExt", name: "MC External Appraisal Report Maintenance", level: 3, group: "3050" },
                { path: "/home/motorRepMaintReviewExt", name: "MC External Appraisal Report Review Maintenance", level: 3, group: "3050" },
                { path: "/home/appRepMaintReviewExt", name: "RE External Appraisal Report Review Maintenance", level: 3, group: "3050" },

                //NEW LEVEL 1
                { path: null, name: "Appraisal Parameters", level: 1, group: "3060" },
                { path: "/home/rcAppraisalAdministration", name: "RC Appraisal Administration", level: 2, group: "3060" },
                { path: "/home/rcAppraisalAdministrationInquire", name: "RC Appraisal Administration (Inquire)", level: 2, group: "3060" },
                { path: "/home/externalAppraisalCompany", name: "External Appraisal Company", level: 2, group: "3060" },
                { path: "/home/externalAppraisalCompanyInquire", name: "External Appraisal Company (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalPurpose", name: "Appraisal Purpose", level: 2, group: "3060" },
                { path: "/home/appraisalPurposeInquire", name: "Appraisal Purpose (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalDocuments", name: "Appraisal Documents", level: 2, group: "3060" },
                { path: "/home/appraisalDocumentsInquire", name: "Appraisal Documents (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalValuationPositiveFactors", name: "Appraisal Valuation Positive Factors", level: 2, group: "3060" },
                { path: "/home/appraisalValuationPositiveFactorsInquire", name: "Appraisal Valuation Positive Factors (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalValuationNegativeFactors", name: "Appraisal Valuation Negative Factors", level: 2, group: "3060" },
                { path: "/home/appraisalValuationNegativeFactorsInquire", name: "Appraisal Valuation Negative Factors (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementType", name: "Appraisal Improvement Type", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementTypeInquire", name: "Appraisal Improvement Type (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementDetails", name: "Appraisal Improvement Details", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementDetailsInquire", name: "Appraisal Improvement Details (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementRoomSection", name: "Appraisal Improvement - Room/Section", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementRoomSectionInquire", name: "Appraisal Improvement - Room/Section (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementImprovementSection", name: "Appraisal Improvement - Improvement Section ", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementImprovementSectionInquire", name: "Appraisal Improvement - Improvement Section (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementScope", name: "Appraisal Improvement - Scope", level: 2, group: "3060" },
                { path: "/home/appraisalImprovementScopeInquire", name: "Appraisal Improvement - Scope (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalVehicleAccessories", name: "Appraisal Vehicle Accessories", level: 2, group: "3060" },
                { path: "/home/appraisalVehicleAccessoriesInquire", name: "Appraisal Vehicle Accessories (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalVehicleParts", name: "Appraisal Vehicle Parts", level: 2, group: "3060" },
                { path: "/home/appraisalVehiclePartsInquire", name: "Appraisal Vehicle Parts (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalPropertyClassification", name: "Appraisal Property Classification", level: 2, group: "3060" },
                { path: "/home/appraisalPropertyClassificationInquire", name: "Appraisal Property Classification (Inquire)", level: 2, group: "3060" },
                { path: "/home/appraisalPropertyOccupancy", name: "Appraisal Property Occupancy", level: 2, group: "3060" },
                { path: "/home/appraisalPropertyOccupancyInquire", name: "Appraisal Property Occupancy (Inquire)", level: 2, group: "3060" },
                { path: "/home/vehicleWarehouse", name: "Vehicle Warehouse", level: 2, group: "3060" },
                { path: "/home/vehicleWarehouseInquire", name: "Vehicle Warehouse (Inquire)", level: 2, group: "3060" },
                { path: "/home/externalAppraisalCompanyAppraisers", name: "External Appraisal Company - Appraisers", level: 2, group: "3060" },
                { path: "/home/externalAppraisalCompanyAppraisersInquire", name: "External Appraisal Company - Appraisers (Inquire)", level: 2, group: "3060" },
                { path: "/home/reportListing", name: "Report Listing", level: 1, group: "3070" }
            ];
        return json;
    }



}
