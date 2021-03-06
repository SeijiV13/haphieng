import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { InitService } from './init.config';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';
import { MessageConfig } from './message.config';
import { CookieService} from 'ngx-cookie';
import { ProgressHttp } from "angular-progress-http";

import * as $ from "jquery";
import { DataPasserService } from './services/data-passer.service';

@Injectable()
export class HttpClient {
  public baseUrl: string;
  public servletUrl: string;
  public env: string;
  public yuanRate: string;
  public wcDisc: string;
  public rcDisc: string;
  public allowedTransactions: any[];

  constructor(private http: Http,
    private location: Location,
    private injector: Injector,
    private _init: InitService,
    private progressHttp: ProgressHttp,
    private mes: MessageConfig,
    private cookieService: CookieService,
    private dataPasser: DataPasserService) {
    this.baseUrl = _init.getConfig('host');
    this.servletUrl = _init.getConfig('servlet');
    this.env = _init.getConfig('env');
    this.yuanRate = _init.getConfig('yuan-rate');
    this.wcDisc = _init.getConfig('wc-discount');
    this.rcDisc = _init.getConfig('rc-discount');
    localStorage.setItem('host', this.baseUrl);
    localStorage.setItem('servlet', this.servletUrl);
    localStorage.setItem('env', this.env);
    localStorage.setItem('yuanRate',  this.yuanRate);
    localStorage.setItem('wcDisc', this.wcDisc);
    localStorage.setItem('rcDisc', this.rcDisc);
  }

  createAuthorizationHeader(headers: Headers) {
    //headers.append('Authorization', 'Bearer ' + this.cookieService.get('token'));
     headers.append('Content-Type', 'application/json');
     headers.append('access-token', this.dataPasser.accessToken);
     headers.append('token-type', this.dataPasser.tokenType);
     headers.append('client', this.dataPasser.client);
     headers.append('expiry', this.dataPasser.expiry);
     headers.append('uid', this.dataPasser.uid);
  }

  getBase(url) {
    this.disableButtons();
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.baseUrl + url, {
      headers: headers
    });
  }
  

  postBase(url, data) {
    this.disableButtons();
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.baseUrl + url, data, {
      headers: headers
    });
  }

   postBaseLogin(url, data) {
    let headers = new Headers();
    return this.http.post(this.baseUrl + url, data);
  }

  postLogoutBase(url, data) {
    this.disableButtons();
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.baseUrl + url, data, {
      headers: headers
    });
  }

  putBase(url, data) {
    this.disableButtons();
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(this.baseUrl + url, data, {
      headers: headers
    });
  }

  deleteBase(url) {
    this.disableButtons();
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.baseUrl + url, {
      headers: headers,
    });
  
  }
  deleteBaseWithBody(url, body) {
    this.disableButtons();
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(this.baseUrl + url, {
      headers: headers,
      body: body
    });
  
  }

  get(url, header) {
    header.append('Authorization', 'Bearer ' + this.cookieService.get('token'));
    return this.http.get(this.baseUrl + url, {
      headers: header
    });
  }

  getDowload(url, header) {
    this.disableButtons();
    header.append('Authorization', 'Bearer ' + this.cookieService.get('token'));
    return this.http.get(this.baseUrl + url, {
      headers: header,
      responseType: ResponseContentType.Blob
    });
    
  }
 
  getServlet(url) {
    var header =new Headers();
    header.append('Authorization', 'Bearer ' + this.cookieService.get('token'));
    return this.http.get(this.servletUrl + url, {
      headers: header
    }).map((res) => new Blob([res.blob()]));;
  }

  postServlet(url, data) {
    this.disableButtons();
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.servletUrl + url, data, {
      headers: headers
    });
  }


  handleMap(response: Response) {
    $('button').not(".exemption-button").removeAttr('disabled');
    $("input.checkbox").not(".checkbox-inquire").removeAttr('disabled');
    return response.json();
  }

  handleDocumentMap(response: Response){
    $('button').removeAttr('disabled');
    $("input.checkbox").not(".checkbox-inquire").removeAttr('disabled');
    return response;
  }

  handleMapImage(response: Response){
    $('button').removeAttr('disabled');
    $("input.checkbox").not(".checkbox-inquire").removeAttr('disabled');
    return new Blob([response.blob()], { type: response.blob().type})
  }
  

  handleError(error: any) {
    $('button').removeAttr('disabled');
    $("input.checkbox").not(".checkbox-inquire").removeAttr('disabled');
    let errorMessage: string;
    //console.log('HTTP CLIENT ERROR:' + error.status);
    //console.log(error);
    if (error.status == 401 || error.status == 403
      || error.status == 408 || error.status == 500) {
      errorMessage = error.message;
      localStorage.setItem('redirectLogin', "true");

    }
    else if (error.status == 0) errorMessage = "Cannot connect to server.";
    else if (error.status != 400) errorMessage = error;
    else if (error.status == 400) {
    }
    if (errorMessage) localStorage.setItem("errorMessage", errorMessage);
    return Observable.throw(error.json() || 'Server error');
  }

  //GENERIC JQUERY FUNCTIONS
  public disableButtons() { $('button').attr('disabled', 'disabled'); $("input.checkbox").prop("disabled", true); }
  public fadeBody() { $("body").fadeOut()}
  public disableBackTrack(enable: boolean) { if(enable){window.history.pushState(null, "", window.location.href); window.onpopstate = function () { window.history.pushState(null, "", window.location.href); };
  
    }
  }
}

