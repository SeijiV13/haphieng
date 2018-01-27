import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient } from '../../generic/httpClient.config';
import { DataPasserService } from '../../generic/services/data-passer.service';
import { InitService } from '../../generic/init.config';
@Injectable()
export class ChangePasswordService {

  constructor(private http: Http,
    private httpClient: HttpClient,
    private dataPasserService: DataPasserService,
    private initService: InitService) { }

  getSecurityQuestions(username: string): Observable<any> {
    return this.httpClient.getBase(`security/changesecquestion?usrid=${username}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  postSecurityQuestions(request) {
    let body = JSON.stringify(request);
    return this.httpClient.postBase('security/changesecquestion', body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getSecQuestionDetails(username: string) {
    return this.httpClient.getBase(`security/secquestion?usrid=${username}`).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  postSecQuestionDetails(request) {
    let body = JSON.stringify(request);
    return this.httpClient.postBase('security/secquestion', body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  resetPassCheck(request) {
    let body = JSON.stringify(request);
    return this.httpClient.postBase('security/resetpasscheck', body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  resetPass(request) {
    let body = JSON.stringify(request);
    return this.httpClient.postBase('security/resetpass', body).map(this.httpClient.handleMap).catch(this.httpClient.handleError);

  }
}


