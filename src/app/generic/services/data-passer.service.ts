
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Rx';
export class DataPasserService {
    
    public selectedData: any;
    public multipleSelectedData: Array<any> = [];
    changeTitleEmitter = new EventEmitter();
    pathForRedirect = new EventEmitter();

    sendPageTitle(data: string) {
        this.changeTitleEmitter.emit(data);
    }
    sendPath(path){
        this.pathForRedirect.emit(path);
    }
    public withFormChanges: boolean;
    public fileLinks: any[] = [];
    public losJsonParam: boolean = false;
    public ropaJsonParam: boolean  = false;
    public multipleSelectedRequest: any[] = [];
    public pageTitle: string = '';


    //user details
    public rcbcInd: string;
    public appraisedValueToMC: string;
    public appraisedValueToRE: string;
    public appraisalRegion: string;
    public appraisalCompany: string = "";
    public userGroup: string;
    public approverInd: string;
    public userLevel: number;
    public userRoleName: string;
    public rcCode: string;
    public appraisalRc: string;
    public requestingGroup = "";
    public username = "";
    public apprLimitRE: string;
    public stopCheckboxDisabling: boolean = false;
    requestType = {
        Appraisal: 'A',
        TVR: 'T',
        Both: 'B'
    }
    requestStatusCode = {
        New: 'NEW',
        Cancelled: 'CAN',
        Completed: 'COM',
        ForApprComp: 'FACA',
        ForAssign: 'FASS',
        ForAppr: 'FAPPR',
        ForDoc: 'FDOC',
        ForExt: 'FEASS',
        Returned: 'RET',
        ForSched: 'FSKED',
        ForTvr: 'FTVR'
    }
    reportStatusCode = {
        Approved: 'APP',
        Cancelled: 'CAN',
        ForApprv: 'FAPPV',
        ForExtr: 'FEREV',
        ForRevision: 'FREVN',
        ForReview: 'FREVW',
        New: 'NEW'
    }
    tvrStatusCode = {
        New: 'NEW',
        Approved: "APP",
        ForApproval: "FAPPV",
        ForRevision: 'FREVN',
        Returned: 'RET',
        Cancelle: 'CAN'
    }

    appraisalTypeCode = {
        INT: 'INT',
        EXT: 'EXT'
    }
}

