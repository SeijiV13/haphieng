import { GenericModalComponent } from './../generic/generic-modal/generic-modal.component';
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SessionTimeoutModalComponent } from '../generic/session-timeout-modal/session-timeout-modal.component';
import { SessionService } from '../generic/services/session.service';
import { CookieService} from 'ngx-cookie';
import { ModalDirective } from 'ngx-bootstrap';
import { DataPasserService } from '../generic/services/data-passer.service';
import { DropdownService } from '../generic/services/dropdown.service';
import * as $ from 'jquery';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, AfterViewInit {

	forceChange = localStorage.getItem('changePasswordWQuestion');
	public dateToday = new Date();
	public pressedLogOut: boolean = false;
	public currentTimeout: number;
	public timeShowed: any;
	public sessWarn: number;
	public sessTimeout: number;
	public username = "";
	public requestors = [];
	public sessionWarningMsg: string;
	losUser: boolean;
	@Input() withButtons = true;
	@ViewChild('logoutModal') logoutModal: GenericModalComponent; 
	constructor(
		public router: Router,
		public sessionService: SessionService,
		public elementRef: ElementRef,
		public dataPasserService: DataPasserService,
		private dropdownService: DropdownService,
	    private cookieService: CookieService) {
		setInterval(() => {
			this.dateToday = new Date();
		}, 1000);

		this.initSessionVariables();
	}
    ngAfterViewInit(){

	}
	ngOnInit() {
		this.username = this.dataPasserService.username;
	}

	logout() {
	   this.router.navigate(['/']);
	   localStorage.clear();
	}

	showSessionWarningModal(msg) {
		this.sessionWarningMsg = msg;
		this.elementRef.nativeElement.sessionWarningMsg.innerHTML = msg;
		this.elementRef.nativeElement.sessionWarningModal.show();
	}

	//Get session warning and timeout values
	initSessionVariables() {
		this.sessionService.getSessVariables().subscribe((data) => {
			//console.log(data);
			this.sessWarn = data.sessWarn;
			this.sessTimeout = data.sessTimeout;
			this.sessCheck();
		});
	}

	sessCheck() {
		//console.log('Session Warning: ' + this.sessWarn + ' | Session Timeout: ' + this.sessTimeout);
		clearTimeout(this.currentTimeout);
		this.currentTimeout = window.setTimeout(() => {
			this.warn(this.sessTimeout, this.sessWarn);
		}, (this.sessTimeout - this.sessWarn));
	}

	forceLogout() {

		if (!this.checkSessExpired()) {
			this.refreshJWT();
			this.sessCheck();
		}
	}

	checkSessExpired() {

		var timeAfterAlert = new Date();
		var timeNow = this.timeShowed;
		if ((timeAfterAlert.getTime() - timeNow.getTime()) > this.sessWarn) {
			//this.confirmationBackModal.hide();
			//this.forceLogoutModal.showWithCustomMessage('You have not used the site for a while. For your security, your connection has been closed.')
			return true;
		} else {
			return false;
		}
	}

	warn(sessTimeout, sessWarn) {
		//hides all modal on timeot warning
		//$(".modal").hide();
		var logTime = sessTimeout;
		var timer = (sessTimeout - sessWarn) / 60000;

		var msg1 = (logTime / 60000) > 1 ? "minutes" : "minute";
		var msg2 = timer > 1 ? timer + " minutes" : "one minute";

		var warnMsg = "You have not used the site for a while. You can extend your connection for " + (logTime / 60000) + " more " + msg1 + ".\n" +
			"(For your security, your connection will close if there is no activity within " + msg2 + ".)\n" +
			"Would you like to extend your connection?";
		//console.log(warnMsg);
		this.timeShowed = new Date();
		//this.confirmationBackModal.showWithCustomMessage(warnMsg);
	}

	refreshJWT() {
		this.sessionService.refreshJWT().subscribe((data) => {
			//console.log(data);
			this.cookieService.remove("token");
			this.cookieService.put("token", data.jwt);
		});
	}

	home() {
		if(this.dataPasserService.withFormChanges){
			this.dataPasserService.sendPath("/home");
		}else{
			this.router.navigate(['/home']);
		}
		
	}

	changePassword(){
		if(this.dataPasserService.withFormChanges){
			this.dataPasserService.sendPath("/home/changePassword");
		}else{
			this.router.navigate(['/home/changePassword']);
		}
	}
	securityQuestion(){
		if(this.dataPasserService.withFormChanges){
			this.dataPasserService.sendPath("/home/securityQuestion");
		}else{
			this.router.navigate(['/home/securityQuestion']);
		}
	}


}
