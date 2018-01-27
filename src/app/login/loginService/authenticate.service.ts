import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { InitService } from '../../generic/init.config';
import { HttpClient } from '../../generic/httpClient.config';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticateService {
  baseUrl;
  constructor(private http: Http,
    private _init: InitService,
    private httpClient: HttpClient,
    private router: Router) {
    this.baseUrl = _init.getConfig('host');
  }

  login(data) {
    return this.http.post(this.baseUrl + "security/login", data)
      .map((res: Response) => res.json()).catch(this.handleError);
  }

  logout() {
    return this.httpClient.postLogoutBase("security/logout", {})
      .map((res: Response) => this.httpClient.handleMap);
  }

  remoteLogout(userid) {
    return this.httpClient.postLogoutBase("security/logout?forLogout=" + userid, {})
      .map((res: Response) => this.httpClient.handleMap);
  }

  changePassword(user, txncode, data) {
    return this.httpClient.postBase(`security/changepassword?usrid=${user}&txncode=${txncode}`, data)
      .map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  getPasswordParameters(user:string) {
    return this.httpClient.getBase(`security/changepassword?usrid=${user}`)
      .map(this.httpClient.handleMap).catch(this.httpClient.handleError);
  }

  

  handleError(error: any): Observable<any> {
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
    if (errorMessage) localStorage.setItem("errorMessage", errorMessage);
    return Observable.throw(error.json() || 'Server error');
  }

  /*login2(user){
    var key = CryptoJS.enc.Utf8.parse("L3Pm0b!leB@nK1n9");
    var iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
    var password = CryptoJS.AES.encrypt(user.password, key,{iv: iv, mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
    password = password.toString().replace(/=/g,"%3D");
    var body = bodyIntro + '&userID=' + user.username + '&password='+ password + '&platform=iOS&appVersion=1.0';
    this.http.post("http://localhost:8080/LBPMBA/Mobile/iAccessLogin.htm", body, {headers: headers}).subscribe(
      response => {
        localStorage.setItem("user", JSON.stringify(response.json()));
        this._router.navigate(['/home']);
      }, error =>{
        alert(error.text());
      }
    );
  }*/
}
