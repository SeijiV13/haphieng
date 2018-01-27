import { Component, OnInit, ViewChild, HostListener, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from "../login/loginService/authenticate.service";
import { Router, NavigationEnd } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { DataPasserService } from '../generic/services/data-passer.service';
import { MenuViewComponent } from '../generic/menu-view/menu-view.component';
import { DropdownService } from '../generic/services/dropdown.service';
import { Location } from '@angular/common';

import * as $ from 'jquery';

@Component({ 
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [AuthenticateService]
})

export class HomeComponent implements OnInit, AfterViewChecked, AfterViewInit {
    public menuItems: any[];
    public pageTitle: string = "";
    public showPageTitle: boolean;
    forceChange = localStorage.getItem('changePasswordWQuestion');
    currentLocation;
    @ViewChild('menuView') menuView: MenuViewComponent;
  

    constructor(
        private authenticate: AuthenticateService,
        private route: ActivatedRoute, private router: Router,
        public dataPasserService: DataPasserService,
        private dropdownService: DropdownService,
        private location: PlatformLocation,
        private loc: Location) {
        //for force change of title
        this.dataPasserService.changeTitleEmitter.subscribe((data) => {
           // console.log(data);
            this.pageTitle = data;
        })
        this.router.events.subscribe((val) => {
            /*if (val instanceof NavigationEnd) {
                console.log(this.dataPasserService.pageTitle);
                this.pageTitle = this.dataPasserService.pageTitle;
                if (this.pageTitle === 'Dashboard') {
                    this.callRestartDropDown();
                }

            }*/
            var body = $('html,body');
            body.scrollTop(0);
            var top = body.scrollTop() // Get position of the body
            if (top != 0) {
                body.animate({ scrollTop: 0 }, '500');
            }
        });
    }

    ngOnInit() {

        $(window).resize(function () {
            var divHeight = $('.header').height();
            var buttonContainerHeight = $('.float-button-container').height();
            // $('#page-content-wrapper').css('margin-top', divHeight + 14 + 'px');
            $('#wrapper').css('margin-top', divHeight + 14 + 'px');
            $('#page-content-wrapper').css('margin-bottom', buttonContainerHeight + 4 + 'px');

        })

        this.router.events.subscribe((link) => {
            var body = $('html,body');
            var top = body.scrollTop() // Get position of the body
            if (top != 0) {
                body.animate({ scrollTop: 0 }, '500');
            }

            /* COMMENT BY DGS TEMPPORARY : DESIGN
            if (link.url === "/home/welcome" || link.url === "/home") {
                this.showPageTitle = false
            } else {
                this.showPageTitle = true;
            }*/  this.showPageTitle = true;
        });

        this.menuItems = this.route.snapshot.data['menu'];
        this.initDropdownValues(this.route.snapshot.data['dropdowns']);
        this.initNonDropdownValues();
    }

    ngAfterViewChecked() {
        var divHeight = $('.header').height();
        var buttonContainerHeight = $('.float-button-container').height();
        // $('#page-content-wrapper').css('margin-top', divHeight + 14 + 'px');
        $('#wrapper').css('margin-top', divHeight + 14 + 'px');
        $('#page-content-wrapper').css('margin-bottom', buttonContainerHeight + 4 + 'px');
    }

    ngAfterViewInit() {
        //disable menu1
        if (localStorage.getItem("passWarn")) {
            if(parseInt(localStorage.getItem("passWarn")) >= 1){
            let message = "Your password will expire in " + localStorage.getItem("passWarn") + " day(s)";
            //this.passwordWarningModal.showWithCustomMessage(message);
            }
            localStorage.removeItem("passWarn");
        }
     
    }


    initDropdownValues(data) {
        sessionStorage.setItem('regDeeds', JSON.stringify(data['regDeeds']));
        sessionStorage.setItem('clearingInds', JSON.stringify(data['clearingInd']));
        sessionStorage.setItem('tvrStatuses', JSON.stringify(data['tvrStatus'].TVR_STATUS));
        sessionStorage.setItem('requestingBranches', JSON.stringify(data.requestingBranch));
        sessionStorage.setItem('requestingBranchesAll', JSON.stringify(data.requestingBranchAll));
        sessionStorage.setItem('encoders', JSON.stringify(data.encoder));
        sessionStorage.setItem('approversTVR', JSON.stringify(data.approverTVR));
        sessionStorage.setItem('provinces', JSON.stringify(data.province));
        sessionStorage.setItem('cities', JSON.stringify(data.city));
        sessionStorage.setItem('rePurposes', JSON.stringify(data.rePurpose));
        sessionStorage.setItem('autoPurposes', JSON.stringify(data.autoPurpose));
        sessionStorage.setItem('classifications', JSON.stringify(data.classification));
        sessionStorage.setItem('propertyTypes', JSON.stringify(data.propertyType));
        sessionStorage.setItem('occupancies', JSON.stringify(data.occupancy));
        sessionStorage.setItem('classify', JSON.stringify(data.classify));
        sessionStorage.setItem('requestingGroups', JSON.stringify(data.requestingGroup));
        sessionStorage.setItem('regions', JSON.stringify(data.region));
        sessionStorage.setItem('branches', JSON.stringify(data.branch));
        sessionStorage.setItem('tatPriorities', JSON.stringify(data.tatPriority));
        sessionStorage.setItem('improvementType', JSON.stringify(data.improvementType));
        sessionStorage.setItem('reportStatus', JSON.stringify(data.reportStatus['RPT_STATUS']));
        sessionStorage.setItem('reviewers', JSON.stringify(data.reviewer));
        sessionStorage.setItem('approvers', JSON.stringify(data.approver));
        sessionStorage.setItem('requestors', JSON.stringify(data.requestor));
        let losJson = JSON.parse(localStorage.getItem('losJson'));

        if(losJson){ // && losJson.losType == "APR041"

            let requestedByArray = data.requestor;
            let exist: boolean = false;
            for (let i = 0; i < requestedByArray.length; i++) {
                if (requestedByArray[i].value == losJson.userID) {
                    exist = true;
                    break;
                }
            }
            if (!exist) {
                let usrId: string = losJson.userID;
                let obj = {};
                obj['label'] = usrId;
                obj['value'] = usrId;
                requestedByArray.push(obj);
                sessionStorage.setItem('requestors', JSON.stringify(requestedByArray));
            }
        }

        sessionStorage.setItem('appraisalCompanies', JSON.stringify(data.appraisalCompany));
        sessionStorage.setItem('warehouses', JSON.stringify(data.VEHwarehouse));
        sessionStorage.setItem('requestStatuses', JSON.stringify(data.requestStatus['REQ_STATUS']));
        sessionStorage.setItem('assetTypes', JSON.stringify(data.assetType));
        sessionStorage.setItem('tatTypes', JSON.stringify(data.tatType));
        sessionStorage.setItem('appraiserValuesByAppraisalCompany', JSON.stringify(data.externalAppraiser));
        sessionStorage.setItem('appraiserValuesByAppraisalRegion', JSON.stringify(data.internalAppraiser));
        sessionStorage.setItem('brands', JSON.stringify(data.VEHbrand));
        sessionStorage.setItem('MCBrand', JSON.stringify(data.VEHbrand));
        sessionStorage.setItem('types', JSON.stringify(data.VEHmodel));
        sessionStorage.setItem('MCModel', JSON.stringify(data.VEHmodel));
        sessionStorage.setItem('allInternalAppraisers', JSON.stringify(data.internalAppraiserAll));
        sessionStorage.setItem('allExternalAppraisers', JSON.stringify(data.externalAppraiserAll));
        //sessionStorage.setItem('appraisers', JSON.stringify(data.reviewer));
        sessionStorage.setItem('appraisers', JSON.stringify(data.internalAppraiserAll.concat(data.externalAppraiserAll)));
        //hard coded values
        sessionStorage.setItem('yesNo', JSON.stringify(this.dropdownService.getYesNoValues()));
        sessionStorage.setItem('appraisalTypes', JSON.stringify(data.apprType));
        sessionStorage.setItem('verified', JSON.stringify(data.verTitle));
        sessionStorage.setItem('utilities', JSON.stringify(data.utility));
        sessionStorage.setItem('bearing', JSON.stringify(data.bearing));
        sessionStorage.setItem('reqGrpByRequestor', JSON.stringify(data.reqGrpByRequestor));
        sessionStorage.setItem('REdocuments', JSON.stringify(data));
        sessionStorage.setItem('MCdocuments', JSON.stringify(data));
    }


    initNonDropdownValues() {
        sessionStorage.setItem('negativeFactors', JSON.stringify(this.route.snapshot.data['negFactors']));
        sessionStorage.setItem('positiveFactors', JSON.stringify(this.route.snapshot.data['posFactors']));
        sessionStorage.setItem('MCequipmentAccesories', JSON.stringify(this.route.snapshot.data['MCEquipAcc']));
        sessionStorage.setItem('MCconditionOfVehicles', JSON.stringify(this.route.snapshot.data['MCCondVech']));
        sessionStorage.setItem('warehouseDetails', JSON.stringify(this.route.snapshot.data['WareHouseDet']));

        let improvements = this.route.snapshot.data['Improvements'];

        sessionStorage.setItem('improvementCharacteristics', JSON.stringify(improvements.characteristics.characteristics));
        sessionStorage.setItem('improvementRooms', JSON.stringify(improvements.characteristics.rooms));
        sessionStorage.setItem('improvementContructions', JSON.stringify(improvements.contructions));
        sessionStorage.setItem('improvementProgress', JSON.stringify(improvements.progress));
        
        let REDocuments = this.route.snapshot.data['REDocuments'];
        let MCDocuments = this.route.snapshot.data['MCDocuments'];
        sessionStorage.setItem('REdocuments', JSON.stringify(REDocuments));
        sessionStorage.setItem('MCdocuments', JSON.stringify(MCDocuments));
        /*
        * this.dropdownService.getNegativeFactors().subscribe((data) => { sessionStorage.setItem('negativeFactors', JSON.stringify(data)); });
        * this.dropdownService.getPositiveFactors().subscribe((data) => { sessionStorage.setItem('positiveFactors', JSON.stringify(data)); });
        * this.dropdownService.getImprovements().subscribe((data) => {
        *   sessionStorage.setItem('improvementCharacteristics', JSON.stringify(data.characteristics.characteristics));
        *   sessionStorage.setItem('improvementRooms', JSON.stringify(data.characteristics.rooms));
        *   sessionStorage.setItem('improvementContructions', JSON.stringify(data.contructions));
        *   sessionStorage.setItem('improvementProgress', JSON.stringify(data.progress));
        * });
        * this.dropdownService.getEquipmentAccessories().subscribe((data) => { sessionStorage.setItem('MCequipmentAccesories', JSON.stringify(data)); });
        * this.dropdownService.getConditionOfVehicle().subscribe((data) => { sessionStorage.setItem('MCconditionOfVehicles', JSON.stringify(data)); });
        * this.dropdownService.getWarehouseDetailValues().subscribe((data) => {sessionStorage.setItem('warehouseDetails', JSON.stringify(data));})
        * */
    }

    //MENU FEATURES
    //for adjustment of sidebar button
    @HostListener('window:resize', ['$event'])
    //restarts the dropdown
    callRestartDropDown() {
        this.menuView.restartDropDown();
    }

    /*Open and closes the sidebar on smaller screens */
    toggleSideBar(event) {
        $("#wrapper").toggleClass('toggled');
    }

    focusOut(event) {
        if ($(event.target).parents('div').last().attr('id') !== 'wrapper' || $(event.target).hasClass('main-second-submenu-button')) {
            $("#wrapper").addClass('toggled');
        }
    }
}
