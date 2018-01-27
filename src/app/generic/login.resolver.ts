import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { HttpClient } from './httpClient.config';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { InitService } from '../generic/init.config';
import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewChild, HostListener, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { PlatformLocation } from '@angular/common';
import { DataPasserService } from '../generic/services/data-passer.service';
import { MenuViewComponent } from '../generic/menu-view/menu-view.component';
import { DropdownService } from '../generic/services/dropdown.service';
import { Location } from '@angular/common';
import * as $ from 'jquery';
@Injectable()
export class LoginResolver implements Resolve<any>{

    pageTitle: string = "";
    baseUrl: string = "";

    constructor(
        private authenticate: AuthenticateService,
        private route: ActivatedRoute, private router: Router,
        private dataPasserService: DataPasserService,
        private dropdownService: DropdownService,
        private location: PlatformLocation,
        private loc: Location,
        private http: HttpClient,
        private initService: InitService) {

    }

    //Observable<any> | Promise<any> | any
    resolve(route: ActivatedRouteSnapshot) {
        return this.initialize();
    }

    getMenuItems() {
        let headers = new Headers();
        return this.http.get("app/maintenance/menu", headers).map((menuItems: Response) => menuItems.json());
    }

    initialize() {
        //this.initDropdownValues();
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.pageTitle = this.dataPasserService.pageTitle;
                if (this.pageTitle === 'Dashboard') {
                    //   this.callRestartDropDown();
                }

            }
            var body = $('html,body');
            body.scrollTop(0);
            var top = body.scrollTop() // Get position of the body
            if (top != 0) {
                body.animate({ scrollTop: 0 }, '500');
            }
        });
    }


    initDropdownValues() {
        this.dropdownService.getProvinceValues().subscribe((data) => { sessionStorage.setItem('provinces', JSON.stringify(data.province)); });
        this.dropdownService.getCityValues().subscribe((data) => { sessionStorage.setItem('cities', JSON.stringify(data.city)); });
        this.dropdownService.getREPurposeValues().subscribe((data) => { sessionStorage.setItem('rePurposes', JSON.stringify(data.rePurpose)); });
        this.dropdownService.getAutoPurposeValues().subscribe((data) => { sessionStorage.setItem('autoPurposes', JSON.stringify(data.autoPurpose)); })
        this.dropdownService.getClassificationValues().subscribe((data) => { sessionStorage.setItem('classifications', JSON.stringify(data.classification)); });
        this.dropdownService.getPropertyTypeValues().subscribe((data) => { sessionStorage.setItem('propertyTypes', JSON.stringify(data.propertyType)); });
        this.dropdownService.getOccupancyValues().subscribe((data) => { sessionStorage.setItem('occupancies', JSON.stringify(data.occupancy)); });
        this.dropdownService.getClassifyValues().subscribe((data) => { sessionStorage.setItem('classify', JSON.stringify(data.classify)); });
        this.dropdownService.getRequestingGroupValues().subscribe((data) => { sessionStorage.setItem('requestingGroups', JSON.stringify(data.requestingGroup)); });
        this.dropdownService.getNegativeFactors().subscribe((data) => { sessionStorage.setItem('negativeFactors', JSON.stringify(data)); });
        this.dropdownService.getPositiveFactors().subscribe((data) => { sessionStorage.setItem('positiveFactors', JSON.stringify(data)); });
        this.dropdownService.getAppRegion().subscribe((data) => { sessionStorage.setItem('regions', JSON.stringify(data.region)); });
        this.dropdownService.getBranchValues().subscribe((data) => { sessionStorage.setItem('branches', JSON.stringify(data.branch)); });
        this.dropdownService.getImprovements().subscribe((data) => {
            sessionStorage.setItem('improvementCharacteristics', JSON.stringify(data.characteristics.characteristics));
            sessionStorage.setItem('improvementRooms', JSON.stringify(data.characteristics.rooms));
            sessionStorage.setItem('improvementContructions', JSON.stringify(data.contructions));
            sessionStorage.setItem('improvementProgress', JSON.stringify(data.progress));
        });

        this.dropdownService.getTatPriority().subscribe((data) => {
            sessionStorage.setItem('tatPriorities', JSON.stringify(data.tatPriority));
        })

        //this.dropdownService.getBranchValues().subscribe((data) => { sessionStorage.setItem('branches', JSON.stringify(data.branch)); });
        this.dropdownService.getImprovementType().subscribe((data) => { sessionStorage.setItem('improvementType', JSON.stringify(data.improvementType)); });
        this.dropdownService.getReportStatus().subscribe((data) => { sessionStorage.setItem('reportStatus', JSON.stringify(data.reportStatus['RPT_STATUS'])); });
        this.dropdownService.getReviewerValues().subscribe((data) => { sessionStorage.setItem('reviewers', JSON.stringify(data.reviewer)); });
        this.dropdownService.getAppraiserValues().subscribe((data) => { sessionStorage.setItem('appraisers', JSON.stringify(data.reviewer)); });
        this.dropdownService.getRequestorValues().subscribe((data) => { sessionStorage.setItem('requestors', JSON.stringify(data.requestor)); });
        this.dropdownService.getAppraisalCompanyValues().subscribe((data) => { sessionStorage.setItem("appraisalCompanies", JSON.stringify(data.appraisalCompany)); });
        this.dropdownService.getWarehouseValues().subscribe((data) => { sessionStorage.setItem("warehouses", JSON.stringify(data.VEHwarehouse)); });
        this.dropdownService.getRequestStatusValues().subscribe((data) => { sessionStorage.setItem('requestStatuses', JSON.stringify(data.requestStatus['REQ_STATUS'])); });
        this.dropdownService.getEquipmentAccessories().subscribe((data) => { sessionStorage.setItem('MCequipmentAccesories', JSON.stringify(data)); });
        this.dropdownService.getConditionOfVehicle().subscribe((data) => { sessionStorage.setItem('MCconditionOfVehicles', JSON.stringify(data)); });
        this.dropdownService.getMCBrand().subscribe((data) => {
            sessionStorage.setItem("brands", JSON.stringify(data.VEHbrand));
            sessionStorage.setItem('MCBrand', JSON.stringify(data.VEHbrand));
        });
        this.dropdownService.getMCModel().subscribe((data) => {
            sessionStorage.setItem("types", JSON.stringify(data.VEHmodel));
            sessionStorage.setItem('MCModel', JSON.stringify(data.VEHmodel));
        });
        this.dropdownService.getTatTypeValues().subscribe((data) => {
            sessionStorage.setItem('tatTypes', JSON.stringify(data.tatType));
        });

        this.dropdownService.getWarehouseDetailValues().subscribe((data) => {
            sessionStorage.setItem('warehouseDetails', JSON.stringify(data));
        })
        this.dropdownService.getAssetTypeValues().subscribe((data) => { sessionStorage.setItem('assetTypes', JSON.stringify(data.assetType)); });
        this.dropdownService.getExternalAppraiserValues().subscribe((data) => { sessionStorage.setItem('appraiserValuesByAppraisalCompany', JSON.stringify(data.externalAppraiser)); });
        this.dropdownService.getInternalAppraiserValues().subscribe((data) => { sessionStorage.setItem('appraiserValuesByAppraisalRegion', JSON.stringify(data.internalAppraiser)); });
    
        //hard coded values

        sessionStorage.setItem('yesNo', JSON.stringify(this.dropdownService.getYesNoValues()));
        sessionStorage.setItem('appraisalTypes', JSON.stringify(this.dropdownService.getAppraisalTypesValues()));
        //sessionStorage.setItem('verified', JSON.stringify(this.dropdownService.getVerifiedValues()));


    }




}
