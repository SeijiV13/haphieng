import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from './httpClient.config';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MenuResolver implements Resolve<any>{

    constructor(private http: HttpClient) { }

    //Observable<any> | Promise<any> | any
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.getMenuItems();
    }

    getMenuItems() {
        let headers = new Headers();
        return this.http.get("app/maintenance/menu", headers).map((menuItems: Response) => menuItems.json());
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


    getMenuItems3() {
        let json = [
            { path: null, name: "Property Appraisal", level: 1, group: "3050" },

            //LEVEL 2 DEPTH
            { path: null, name: "Appraisal Request", level: 2, group: "3050" },
            //LEVEL 3 DEPTH
            { path: "/home/appraisalRequestMaintenanceRE", name: "RE Appraisal Request", level: 3, group: "3050" },
            { path: "/home/appraisalRequestMaintenanceMotor", name: "MC Appraisal Request", level: 3, group: "3050" },

            //LEVEL 2 DEPTH
            { path: null, name: "Appraisal Assignment", level: 2, group: "3050" },
            //LEVEL 3 DEPTH
            { path: "/home/appraisalRequestDocumentChecklistRE", name: "RE Appraisal Request - Document Checklist", level: 3, group: "3050" },
            { path: "/home/appraisalRequestAssignmentRE", name: "RE Appraisal Request - Assignment", level: 3, group: "3050" },
            { path: "/home/externalAppraisalRequestAssignmentRE", name: "RE External Appraisal Request - Assignment", level: 3, group: "3050" },
            { path: "/home/appraisalRequestApprCompanyAssignmentRE", name: "RE Appraisal Request - Appraisal Company Assignment", level: 3, group: "3050" },
            { path: "/home/appraisalRequestReAssignmentRE", name: "RE Appraisal Request - Re-Assignment", level: 3, group: "3050" },
            { path: "/home/externalAppraisalRequestReAssignmentRE", name: "RE External Appraisal Request - Re-Assignment", level: 3, group: "3050" },

            { path: "/home/appraisalRequestDocumentChecklistMotor", name: "MC Appraisal Request - Document Checklist", level: 3, group: "3050" },
            { path: "/home/appraisalRequestAssignmentMotor", name: "MC Appraisal Request - Assignment", level: 3, group: "3050" },
            { path: "/home/externalAppraisalRequestAssignmentMotor", name: "MC External Appraisal Request - Assignment", level: 3, group: "3050" },
            { path: "/home/appraisalRequestApprCompanyAssignmentMotor", name: "MC Appraisal Request - Appraisal Company Assignment", level: 3, group: "3050" },
            { path: "/home/appraisalRequestReAssignmentMotor", name: "MC Appraisal Request - Re-Assignment", level: 3, group: "3050" },
            { path: "/home/externalAppraisalRequestReAssignmentMotor", name: "MC External Appraisal Request - Re-Assignment", level: 3, group: "3050" },

            //LEVEL 2 DEPTH
            { path: null, name: "Appraisal Report", level: 2, group: "3050" },
            //LEVEL 3 DEPTH
            { path: "/home/appRepMaint", name: "RE Appraisal Report", level: 3, group: "3050" },
            { path: "/home/appRepMaintExt", name: "RE External Appraisal Report", level: 3, group: "3050" },
            { path: "/home/appRepMaintBasic", name: "RE Appraisal Report - Inquiry", level: 3, group: "3050" },
            { path: "/home/motorRepMaint", name: "MC Appraisal Report", level: 3, group: "3050" },
            { path: "/home/motorRepMaintExt", name: "MC External Appraisal Report", level: 3, group: "3050" },
            { path: "/home/motorRepMaintBasic", name: "MC Appraisal Report - Inquiry", level: 3, group: "3050" },

            //LEVEL 2 DEPTH
            { path: null, name: "Appraisal Approval", level: 2, group: "3050" },
            //LEVEL 3 DEPTH
            { path: "/home/appRepMaintApprove", name: "RE Appraisal Report - Approval", level: 3, group: "3050" },
            { path: "/home/motorRepMaintApprove", name: "MC Appraisal Report - Approval", level: 3, group: "3050" },
            { path: "/home/appRepMaintReviewExt", name: "RE External Appraisal Report - Review", level: 3, group: "3050" },
            { path: "/home/motorRepMaintReviewExt", name: "MC External Appraisal Report - Review", level: 3, group: "3050" },

            //NEW LEVEL 1
            { path: null, name: "Appraisal Parameters", level: 1, group: "3060" },
            //LEVEL 2 DEPTH
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
            //NEW LEVEL 1
            { path: "/home/reportListing", name: "Report Listing", level: 1, group: "3070" }
        ]
        return json;
    }

}
