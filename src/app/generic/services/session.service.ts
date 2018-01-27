import { Injectable } from "@angular/core";
import { Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "../../generic/httpClient.config";
import { Http } from "@angular/http";
@Injectable()
export class SessionService {

  constructor(public httpClient: HttpClient, public http: Http) {}

  getSessVariables(): Observable<any>{
    
    return this.httpClient.getBase('security/sessvar').map(this.httpClient.handleMap);
  }

  refreshJWT(): Observable<any>{
    return this.httpClient.postLogoutBase('security/jwtrefresh',{}).map(this.httpClient.handleMap);
  }

}
