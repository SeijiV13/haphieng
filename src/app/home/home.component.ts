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
