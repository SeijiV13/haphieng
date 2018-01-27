import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ClearSessionService } from '../../generic/services/clear-session.service';
import { DataPasserService} from '../../generic/services/data-passer.service';
import { Router} from '@angular/router'; 
import * as $ from "jquery";

@Component({
    selector: 'menu-view',
    templateUrl: './menu-view.component.html',
    styleUrls: ['./menu-view.component.css']
})
export class MenuViewComponent implements OnInit {

    @Input() parentId: string;
    @Input() currentLevel: number = 1;
    @Input() menuData: any[];
    @Output() restartBreadcrumbsEmitter = new EventEmitter();
    constructor(
        private clearSessionService: ClearSessionService,
        private router: Router,
        private dataPasserService: DataPasserService) { }

    //CHANGES THE CARET OF THE DROPDOWN IF OPENED OR CLOSED
    changeCaret(event) {
        //if the button is clicked
        if ($(event.target).attr('class') === 'main-menu-button btn btn-primary' || $(event.target).attr('class') === 'main-submenu-button btn btn-primary') {
            if ($(event.target).children().hasClass("fa-caret-down")) {
                $(event.target).children(".dynamic").removeClass("fa-caret-down").addClass("fa-caret-up");
                $(event.target).children(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
            }
            else {
                $(event.target).children(".dynamic").removeClass("fa-caret-up").addClass("fa-caret-down");
                $(event.target).children(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
            }
        }

        //if the fa-folder is click
        else if ($(event.target).hasClass("fa-folder")) {
            $(event.target).removeClass("fa-folder").addClass("fa-folder-open");
            $(event.target).siblings(".fa-caret-down").removeClass("fa-caret-down").addClass("fa-caret-up");
        }
        else if ($(event.target).hasClass("fa-folder-open")) {
            $(event.target).removeClass("fa-folder-open").addClass("fa-folder");
            $(event.target).siblings(".fa-caret-up").removeClass("fa-caret-up").addClass("fa-caret-down");
        }
        // if the caret is clicked
        else {
            if ($(event.target).hasClass("fa-caret-down")) {
                $(event.target).siblings(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
                $(event.target).removeClass("fa-caret-down").addClass("fa-caret-up");
            }
            else if ($(event.target).hasClass("fa-caret-up")) {
                $(event.target).siblings(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
                $(event.target).removeClass("fa-caret-up").addClass("fa-caret-down");
            }
        }

    }

    //ASSIGNS THE ACTIVE BUTTON
    activeButton(event) {
        $(".main-second-submenu-button").removeClass("active-submenu");
        $(event.target).addClass("active-submenu");
    }

    //TOGGEE FUNCTION FOR MENU
    toggleMainMenu(event) {

        if ($(event.target).attr('class') === 'main-menu-button btn btn-primary') {

            $(event.target).siblings(".submenu").slideToggle();
            $(".main-menu-button").not(event.target).siblings(".submenu").slideUp();

            //restarts the caret of other main menu button
            $(".main-menu-button").not(event.target).children(".fa-caret-up").removeClass("fa-caret-up").addClass("fa-caret-down");
            $(".main-menu-button").not(event.target).children(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");



        }

        //if the caret is clicked
        else {
            $(event.target).parent(".main-menu-button").siblings(".submenu").slideToggle();

            //close other main menu
            $(".main-menu-button").not($(event.target).parent(".main-menu-button")).siblings(".submenu")
                .slideUp();

            //restarts the caret of other main menu button
            $(".main-menu-button").not($(event.target).parent(".main-menu-button")).children(".fa-caret-up").removeClass("fa-caret-up").addClass("fa-caret-down");
            $(".main-menu-button").not($(event.target).parent(".main-menu-button")).children(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");


            //close other submenu that are open
            //$(".main-submenu-button").not($(event.target).parent(".main-menu-button").siblings(".main-submenu-button")).siblings(".submenu")
            // .slideUp();

            //restarts the caret of other sub menu button
            //  $(".main-submenu-button").not($(event.target).parent(".main-menu-button").siblings(".main-submenu-button")).children(".fa")
            //.removeClass("fa-caret-up")
            // .addClass("fa-caret-down");
        }


    }

    toggleSubMenu(event) {
        if ($(event.target).attr('class') === 'main-submenu-button btn btn-primary') {
            $(event.target).siblings(".submenu").slideToggle();

            //close other submenu
            //  $(".main-submenu-button").not($(event.target)).siblings(".submenu")
            // .slideUp();

            //restarts the caret
            //  $(".main-submenu-button").not(event.target).children(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");

        }
        else {
            $(event.target).parent('.main-submenu-button').siblings(".submenu").slideToggle();

            //close other submenu
            // $(".main-submenu-button").not($(event.target).parent('.main-submenu-button')).siblings(".submenu")
            //  .slideUp();

            //restarts the caret
            //  $(".main-submenu-button").not($(event.target).parent('.main-submenu-button')).children(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");
        }
    }


    //ADDED BY SEIJI VILLAFRANCA
    //RESTARTS THE DROPDOWN MENU ON HOME
    restartDropDown() {
        $(".main-menu-button").siblings(".submenu").slideUp();
        $(".main-submenu-button").siblings(".submenu").slideUp();

        //RESTARTS THE CARET
        $(".main-menu-button").children(".dynamic").removeClass("fa-caret-up").addClass("fa-caret-down");
        $(".main-submenu-button").children(".dynamic").removeClass("fa-caret-up").addClass("fa-caret-down");
        $(".main-menu-button").children(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");

        //removes the active button
        $(".main-second-submenu-button").removeClass("active-submenu");
    }

    restartBreadcrumbs() {
        this.restartBreadcrumbsEmitter.emit();
    }

    ngOnInit() {

        //initialize id for each node
        for (let counter in this.menuData) {
            this.menuData[counter].id = this.menuData[counter].group + "|" + this.menuData[counter].level + "|" + counter;

        }

        //initialize parent id for each node
        for (var counter in this.menuData) {
            var currentGroup = this.menuData[counter].group;
            var currentId = this.menuData[counter].id;

            if (this.menuData[counter].level === 1) {
                this.menuData[counter].parentId = "root";

            }
            //traverse to initialize parent id for each node
            for (var innerCounter = Number(counter) + 1; innerCounter < this.menuData.length; innerCounter++) {

                if (this.menuData[innerCounter].group == currentGroup && this.menuData[innerCounter].level - this.menuData[counter].level === 1) {
                    this.menuData[innerCounter].parentId = currentId;
                }
            }

        }

        for (counter in this.menuData) {
            if (this.menuData[counter].level === 1) {
                var currentGroup = this.menuData[counter].group;

            }

        }



    }
    clearSession() {
        this.clearSessionService.clearSessions();
    }

    redirectPage(path){
        if(this.dataPasserService.withFormChanges){
            this.dataPasserService.sendPath(path);
        }else{
            this.router.navigate([path]);
        }
    }

}
