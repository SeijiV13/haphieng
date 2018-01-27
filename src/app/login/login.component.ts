import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { AuthenticateService } from "./loginService/authenticate.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CanActivate, RouterStateSnapshot, ActivatedRoute, Params } from "@angular/router";
import { Router } from '@angular/router';
import { DropdownService } from '../generic/services/dropdown.service';
import { DataPasserService } from '../generic/services/data-passer.service';
import { FormErrorHandlerService } from '../generic/services/form-error-handler.service';
import { MessageConfig } from '../generic/message.config';
import { UserDetailsService } from '../generic/services/user-details.service';
import { CookieService} from 'ngx-cookie';
import { ChangePasswordService } from '../generic/services/change-password.service';
import { InitService } from '../generic/init.config';
import * as $ from 'jquery';
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [AuthenticateService]
})
export class LoginComponent implements OnInit {
    showLoading = false;
    verifyAnswerError: boolean = false;
    questionIsActive = false;
    attempts: number = 3;
    questionAnswered: boolean = false;
    loginForm: FormGroup;
    securityForm: FormGroup;
    showDiv: boolean = false;
    loginPressed: boolean = false;
    errorMessage: string;
    errorAnswer: string;
    invalidAnswer: boolean = false;
    question: string = "";
    answer: string = "a";
    private errMes: MessageConfig;
    public patchVersion: string;
    public usrid: string;
    loginSuccess: boolean = false;
    constructor(
        private authenticate: AuthenticateService,
        private dropdownService: DropdownService,
        private router: Router,
        private injector: Injector,
        private errHandler: FormErrorHandlerService,
        private formBuilder: FormBuilder,
        private _init: InitService,
        private dataPasserService: DataPasserService,
        private userDetails: UserDetailsService,
        private activatedRoute: ActivatedRoute,
        private changePassword: ChangePasswordService,
        private cookieService: CookieService) {
        this.cookieService.removeAll();
        setTimeout(() => { this.errMes = <MessageConfig>this.injector.get(MessageConfig); }, 500);
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });

        this.securityForm = this.formBuilder.group({
            answer: ['', [Validators.required]]
        });
        this.patchVersion = _init.getConfig('patchVersion');

    }

    ngOnInit() {

        $('body').addClass("background-image");
        this.activatedRoute.queryParams.subscribe(params => {
            //console.log(params['losUrl']);
            if (params['losUrl']) {
                this.showDiv = false;
                this.losLogin();
                if (params['losType'])
                    this.losParameter(params);
            }else if (params['ropaUrl']) {
                this.showDiv = false;
                this.ropaLogin();
                if (params['ropaType'])
                    this.ropaParameter(params);
            }else {
                this.showDiv = true;
            }
        });
    }
    ngOnDestroy() {
        $('body').removeClass("background-image");
    }

    /* Main Functions */
    onClear() {
        this.loginForm.reset();
        this.errorMessage = "";
    }

    remoteLogout() {
        this.loginPressed = false;
        this.authenticate.remoteLogout(this.usrid).subscribe(
            (data) => {
                this.cookieService.remove("token");
                this.errorMessage = "";
            }, (error) => { }
        );
    }

    losLogin() {
        let losLogin = {
            username: "losUser",
            password: "",
        }
        this.loginService(losLogin, "losUser");
    }

    ropaLogin() {
        let ropaLogin = {
            username: "ropaUser",
            password: "",
        }
        this.loginService(ropaLogin, "ropaUser");
    }

    losParameter(parameter) {
        var type = parameter['losType'];
        var losJson = {};
        losJson['losType'] = parameter['losType'];
        if (type) {
            if (type == "APR035" || type == "APR005") {
                losJson['userID'] = parameter['userID'];
                losJson['reportNo'] = parameter['reportNo'];
            } else if (type == "APR041") {
                losJson['userID'] = parameter['userID'];
                losJson['appNo'] = parameter['appNo'];
            } else if (type == "APR050") {
                losJson['userID'] = parameter['userID'];
                losJson['appNo'] = parameter['appNo'];
                losJson['subject'] = parameter['subject'];
                losJson['propType'] = parameter['propType'];
                losJson['propNo'] = parameter['propNo'];
                losJson['tctNo'] = parameter['tctNo'];
                losJson['propLoc'] = parameter['propLoc'];
                losJson['prov'] = parameter['prov'];
                losJson['city'] = parameter['city'];
                losJson['userRC'] = parameter['userRC'];
                losJson['userGrp'] = parameter['userGrp'];
                losJson['assetType'] = "N"; // DEFAULT VALUE FOR ASSET TYPE = NON ROPA
                losJson['RCBCInd'] = "N"; // DEFAULT VALUE FOR RCBC IND = No
            }
        }
        localStorage.setItem('losJson', JSON.stringify(losJson));
    }

    ropaParameter(parameter) {
        var type = parameter['ropaType'];
        var ropaJson = {};
        ropaJson['ropaType'] = parameter['ropaType'];
        if (type) {
            if (type == "APR030" || type == "APR003") {
                ropaJson['reportNo'] = parameter['reportNo'];
            }
        }
        localStorage.setItem('ropaJson', JSON.stringify(ropaJson));
    }

    onSubmit() {

        this.loginForm.updateValueAndValidity();
        if (this.loginForm.invalid) {
            this.errHandler.markFormDirty(this.loginForm);
            return;
        }
        this.loginService(this.loginForm.value, false);
    }

    loginService(formValue, user) {
        this.loginPressed = true;
        this.authenticate.login(formValue).subscribe(
            (data) => {
                if (data.status === 'SUCCESS') {


                    //get user details
                    this.cookieService.put("token", data.jwt);
                    this.dropdownService.getTransactionList().subscribe((data) => {
                        localStorage.setItem('allwtrn', JSON.stringify(data));
                    });
                    this.userDetails.getUserDetails().subscribe((data) => {
                        this.dataPasserService.appraisalRegion = data.appraisalRegion;
                        this.dataPasserService.appraisalCompany = data.appraisalCompany;
                        this.dataPasserService.userGroup = data.userGroup;
                        this.dataPasserService.userRoleName = data.userRoleName;
                        this.dataPasserService.appraisalRc = data.appraisalRc;
                        this.dataPasserService.rcCode = data.rcCode;
                        this.dataPasserService.username = data.userId;
                        this.dataPasserService.requestingGroup = data.userGroup;
                        this.dataPasserService.userLevel = data.userLevel;
                        this.dataPasserService.approverInd = data.approverInd != null ? data.approverInd : '';
                        this.dataPasserService.appraisedValueToMC = !data.appraisedValueToMC ? "0.00" : data.appraisedValueToMC;
                        this.dataPasserService.appraisedValueToRE = !data.appraisedValueToRE ? "0.00" : data.appraisedValueToRE;
                        this.dataPasserService.rcbcInd = data.rcbcID;

                        // this.dataPasserService.appraisalCompany = data.appraisalCompany;
                        this.dataPasserService.userGroup = data.userGroup != null ? data.userGroup : '';
                        this.dataPasserService.userRoleName = data.userRoleName != null ? data.userRoleName : '';
                        this.dataPasserService.rcCode = data.rcCode != null ? data.rcCode : '';
                        this.dataPasserService.apprLimitRE = data.apprLimitRE;
                        if (user == "losUser") {
                            let json = JSON.parse(localStorage.getItem('losJson'));
                            this.dataPasserService.username = json.userID;
                            this.dataPasserService.appraisalRc = json.userRC != null ? json.userRC : '';
                            this.dataPasserService.requestingGroup = json.userGrp != null ? json.userGrp : '';
                            this.dataPasserService.userGroup = json.userGrp != null ? json.userGrp : '';
                            //no appraisal region upon save
                            //this.dataPasserService.appraisalRegion = json.userRc != null ? json.userRc : '';
                        } else {
                            this.dataPasserService.username = data.userId;
                            this.dataPasserService.requestingGroup = data.userGroup != null ? data.userGroup : '';
                            this.dataPasserService.userGroup = data.userGroup != null ? data.userGroup : '';
                            this.dataPasserService.appraisalRc = data.appraisalRc != null ? data.appraisalRc : '';

                            //pop up security question
                            //possible only if indicaor for enabled question is Y and not a los user
                            this.changePassword.getSecQuestionDetails(data.userId).subscribe((data) => {
                                localStorage.setItem('questionIsActive', "yes");
                                this.question = data['qstn'];
                                sessionStorage.setItem('seqNoAnswerLogin', data['seqNo']);
                                sessionStorage.setItem('questionToAnswerLogin', data['qstn']);
                                this.questionIsActive = true;
    
                                if (data['qstn']) {
                                    this.questionIsActive = true;
                                    localStorage.setItem('questionIsActive', "yes");
                                    //$(".form-login").addClass("fade-login");
                                    // $(".information-section").addClass("fade-login");
                                    this.loginSuccess = true;
                                    $("#wrapper").removeClass("toggled");
                                }
                                else{
                                    this.questionIsActive = false
                                    localStorage.setItem('questionIsActive', "no");
                                }
                            }, (err) => {
                                localStorage.setItem('questionIsActive', "no");
                            });
                        }

                        this.dataPasserService.userLevel = data.userLevel != null ? data.userLevel : '';

                    });
                    setTimeout(() => {
                        this.showLoading = true;
                        if (data.redirect && data.redirect == "changepassword") {
                            if (localStorage.getItem('questionIsActive') !== 'yes')
                                this.router.navigate(['/home/changePassword'], { queryParams: { disable: true } });
                            else
                                localStorage.setItem('changePasswordWQuestion', "yes");

                        } else {
                            if (localStorage.getItem('losJson')) {
                                this.dataPasserService.losJsonParam = true;
                                let type = JSON.parse(localStorage.getItem("losJson")).losType;
                                if(type == "APR005"){
                                    this.router.navigate(['/home/appraisalRequestMaintenanceMotor']);
                                }else{
                                    this.router.navigate(['/home/appraisalRequestMaintenanceRE']);
                                }
                                return;
                            }else if (localStorage.getItem('ropaJson')) {
                                this.dataPasserService.ropaJsonParam = true;
                                sessionStorage.setItem('ropaJson', localStorage.getItem('ropaJson'));
                                let type = JSON.parse(localStorage.getItem("ropaJson")).ropaType;
                                if(type == "APR030"){
                                    this.router.navigate(['/home/appRepMaintBasic']);
                                }else if(type == "APR003"){
                                    this.router.navigate(['/home/motorRepMaintBasic']);
                                }
                            }
                            if (data.passWarn) {
                                localStorage.setItem("passWarn", data.passWarn);
                            }
                            if ( localStorage.getItem('questionIsActive') !== 'yes'
                                    && !localStorage.getItem('losJson') 
                                    && !localStorage.getItem('ropaJson')) {
                                      
                                this.router.navigate(['/home/createRequestRE']);
                            }
                        }
                    }, 2000)



                }
            },
            (error) => {
                console.log(error);
                this.loginPressed = false;
                if (error.status == "ERROR") {
                    if (error.message.indexOf('|') > -1) {
                        this.usrid = error.message.substring(error.message.indexOf('|') + 1);
                        this.errorMessage = error.message.substring(0, error.message.indexOf('|'));
                    } else {
                        this.errorMessage = error.message;
                    }
                }
                else {
                    //localStorage.setItem("errorMessage",this.errMes.getErrorMessage("serverError"));
                    this.loginService(this.loginForm.value, "");
                }
            });

    }

    cancelSecurityQuestion() {
        this.showLoading = false;
        this.authenticate.logout().subscribe(
            (data) => {
                this.cookieService.remove("token");
                $("#wrapper").addClass("toggled");
                // $(".form-login").removeClass("fade-login");
                // $(".information-section").removeClass("fade-login");

                this.loginSuccess = false;
                $(".security-button").removeAttr('disabled');
                this.loginPressed = false;
            }, (error) => {/**console.log(error.text());**/ },
            () => { }
        );

    }

    onSubmitAnswer() {
        //  if (this.attempts > 0) {
        let result;
        let Json = {
            "seqNo": sessionStorage.getItem('seqNoAnswerLogin'),
            "usrID": this.loginForm.controls['username'].value,
            "qstn": sessionStorage.getItem('questionToAnswerLogin'),
            "qstnAnswer": this.securityForm.controls['answer'].value
        }
        this.changePassword.postSecQuestionDetails(Json).subscribe((data) => {

            $("#wrapper").addClass("toggled");
            this.questionAnswered = true;
            if (localStorage.getItem('changePasswordWQuestion') == 'yes')
                this.router.navigate(['/home/changePassword']);
            else
                this.router.navigate(['/home']);
        }, (err) => { //catch error in server
            this.invalidAnswer = true;
            this.attempts--;
            this.errorAnswer = err.message;
        });
        //  } else {
        //   }

    }





}
